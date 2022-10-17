package com.oauth2.sample.web.mybatis;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.ibatis.cache.CacheKey;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.mapping.SqlCommandType;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StopWatch;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
@Intercepts
(
    {
        @Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class}) 
       ,@Signature(type = Executor.class, method = "query",  args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class, CacheKey.class, BoundSql.class}) 
       ,@Signature(type = Executor.class, method = "query",  args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}) 
    }
)
public class MyBatisExecutionInterceptor implements Interceptor{
	private static final Logger logger = LoggerFactory.getLogger(MyBatisExecutionInterceptor.class);
	private static final Logger sqlLog = LoggerFactory.getLogger("sqlLog");
	
	public MyBatisExecutionInterceptor() {
		logger.info("init MyBatisExecutionInterceptor");
	}
	
	@Override
	public Object intercept(Invocation invocation) throws Throwable {
        Object[]        args     = invocation.getArgs();
        MappedStatement ms       = (MappedStatement)args[0];
        Object          param    = (Object)args[1];
        BoundSql        boundSql = ms.getBoundSql(param);
        String          query_id = ms.getId();
    	String          query_type = ms.getSqlCommandType().toString();
        
    	if(query_id.equals("CmmLog.insertSqlLog"))
			return invocation.proceed();

    	String query = getExecuteQuery(boundSql, param);

        String PGM_PATH ="", PGM_INFO = "";
		try{
			throw new Exception("프로그램 ID 추출");
		}catch(Exception ex){
			StackTraceElement[] stackTraceElement =  ex.getStackTrace();
			for(int i = 2; i < stackTraceElement.length; i++){
				String name = stackTraceElement[i].getClassName();
				if(name.indexOf("Interceptor") > -1)continue;
				if((name.indexOf("smartplus") > -1 || name.indexOf("egovframework.com") > -1)
					&& name.indexOf("egovframework.com.cmm.service.impl.EgovComAbstractDAO") == -1
						){
					PGM_PATH = stackTraceElement[i].getClassName();
					String daoMethod = stackTraceElement[i-1].getMethodName();
					PGM_INFO = String.format("%s.%s(line:%s):%s", PGM_PATH, stackTraceElement[i].getMethodName() , stackTraceElement[i].getLineNumber(),daoMethod);
					break;
				}
			}
		}

		Object proceed = null;
    	Throwable caus = null;
		int _RSLT_COUNT = 0;
    	StringBuffer sb    = new StringBuffer();
		
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
        try{
        	ObjectMapper mapper = new ObjectMapper();
    		String _PARAMETER = mapper.writeValueAsString(param).toString();
        	
    		sb.append("\n================================[SQL LOG START]================================\n");
    		sb.append("\t PGM_INFO 	=>	" + PGM_INFO + "\n");
    		sb.append("\t QUERY ID	=>	" + query_id + "\n");
    		sb.append("\t QUERY		=>	\n" + query + "\n");
    		sb.append("\t PARAMETER	=>	" + _PARAMETER + "\n");
        	
        	proceed = invocation.proceed();
        	
    		if(proceed != null) {
    			if(proceed instanceof List<?>) {
    				_RSLT_COUNT = ((ArrayList<?>) proceed).size();
    			}else if(proceed instanceof Map){
    				_RSLT_COUNT = (((Map) proceed).size() == 0 ? 0 : 1);
    			}else if(proceed instanceof Number) {
    				if(SqlCommandType.SELECT.equals(ms.getSqlCommandType()))
    				{
    					_RSLT_COUNT = 1;
    				}else {
    					_RSLT_COUNT = (int)proceed;
    				}
    			}
    		}
    		if(query_id.endsWith("!selectKey"))
    			sb.append("\t <selectKey>    => " + proceed + "\n");
    		sb.append("\t RESULT		=>	" + query_type + " / " + _RSLT_COUNT + "건\n");
        }catch (Exception e){
        	caus = e;
        	if(e.getCause() != null) caus = e.getCause();
			sb.append("\t EXCEPTION	=>	" + caus.getMessage());
		}
        stopWatch.stop();
        double sec = stopWatch.getTotalTimeSeconds();

		sb.append("\t EXEC TIME	=>	" + (sec + "s") + "\n");
		sb.append("===================================[SQL LOG END]===================================\n\n");
		logger.debug(sb.toString());
		
		

//		DBLogVO vo = new DBLogVO();
//		try {
//			
//			HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
//			LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
//			
//			if("LOCAL".equals(SpringContextUtil.getServerName()))
//			{
//				vo.setIpAdr(InetAddress.getLocalHost().getHostAddress());
//			}else {
//				vo.setIpAdr(request.getRemoteAddr());
//			}
//			
//			vo.setUsrId(loginVO.getEno());
//			vo.setUsrNm(loginVO.getEmpNm());
//		}catch (Exception e) {}
//		
//		if(vo.getUsrId() != null)
//		{
//			vo.setSqlId(query_id);
//			vo.setSqlCntn(query);
//			if(caus != null)
//			{
//				vo.setErrYn("Y");
//				vo.setErrCntn(caus.getMessage());
//			}else{
//				vo.setErrYn("N");
//				vo.setErrCntn("");
//			}
//			
//			vo.setRsltCnt(String.valueOf(_RSLT_COUNT));
//			vo.setExeTm(String.valueOf(sec));
//			
//			ObjectMapper mapper = new ObjectMapper();
//			sqlLog.info(mapper.writeValueAsString(vo));
//		}
		
		if(caus != null) {
			throw caus;
		}
		
		return proceed;
	}
	
	private String getExecuteQuery(BoundSql boundSql, Object param){
		String sql = "";
		try{
			sql = boundSql.getSql();
			List<ParameterMapping> paramMapping = boundSql.getParameterMappings();
			
			if(param == null){
				sql = sql.replaceAll("\\?", "''");
			}else{
				if(param instanceof Integer || param instanceof Long || param instanceof Float || param instanceof Double){
					sql = sql.replaceFirst("\\?", param.toString());
				}else if(param instanceof String){
					sql = sql.replaceFirst("\\?", "'" + param + "'");
				}else if(param instanceof Map){
					for(ParameterMapping mapping : paramMapping){
						String propValue = mapping.getProperty();
						Object value = ((Map)param).get(propValue);
						if(value != null) {
							if(value instanceof String) {
								sql = sql.replaceFirst("\\?", "'" + value + "'");
	                        } else {
	                        	sql = sql.replaceFirst("\\?", value.toString());
	                        }
	                    } else {
	                    	String temp_value = String.valueOf(boundSql.getAdditionalParameter(propValue));
	                    	sql = sql.replaceFirst("\\?", "'"+temp_value+"'");
	                    }
					}
				} else {
	                Class<? extends Object> paramClass = param.getClass();

	                for(ParameterMapping mapping : paramMapping) {
	                    String propValue = mapping.getProperty();
	                    Field field = paramClass.getDeclaredField(propValue);
	                    field.setAccessible(true);
	                    Object o = field.get(param);
                    	
	                    Class<?> javaType = mapping.getJavaType();

						if(!propValue.equalsIgnoreCase("password")) {
							if(String.class == javaType){
								sql = sql.replaceFirst("\\?", "'" + o + "'");
							} else {
								if(o == null) o = "''";
								sql = sql.replaceFirst("\\?", o.toString());
							}
						}
	                }
				}
			}
		}catch(Exception ex){
			logger.error("Exception getExecuteQuery:{}",ex);
		}
		return sql;
	}
	
	
	
	@Override
	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}
	@Override
	public void setProperties(Properties properties) {
	}
}
