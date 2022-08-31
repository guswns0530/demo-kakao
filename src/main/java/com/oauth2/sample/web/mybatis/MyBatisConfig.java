package com.oauth2.sample.web.mybatis;

import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.aop.Advisor;
import org.springframework.aop.aspectj.AspectJExpressionPointcut;
import org.springframework.aop.support.DefaultPointcutAdvisor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.TransactionManager;
import org.springframework.transaction.interceptor.MatchAlwaysTransactionAttributeSource;
import org.springframework.transaction.interceptor.RollbackRuleAttribute;
import org.springframework.transaction.interceptor.RuleBasedTransactionAttribute;
import org.springframework.transaction.interceptor.TransactionInterceptor;

import java.util.Collections;


@Slf4j
@Configuration
public class MyBatisConfig {

    private final JdbcTemplate jdbcTemplate;
    private final TransactionManager transactionManager;

    @Autowired
    public MyBatisConfig(JdbcTemplate jdbcTemplate,TransactionManager transactionManager) {
        log.info("init mybatis");
        this.jdbcTemplate = jdbcTemplate;
        this.transactionManager = transactionManager;
    }

    @Bean
    public TransactionInterceptor transactionAdvice() {
        log.info("init transactionAdvice");
        MatchAlwaysTransactionAttributeSource source = new MatchAlwaysTransactionAttributeSource();
        RuleBasedTransactionAttribute transactionAttribute = new RuleBasedTransactionAttribute();
        transactionAttribute.setName("*");
        transactionAttribute.setRollbackRules(Collections.singletonList(new RollbackRuleAttribute(Exception.class)));
        source.setTransactionAttribute(transactionAttribute);

        return new TransactionInterceptor(transactionManager, source);
    }

//    @Bean
    public Advisor transactionAdviceAdvisor() {
        log.info("init transactionAdviceAdvisor");
        AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
        pointcut.setExpression("execution(* *Impl*(..))");
        return new DefaultPointcutAdvisor(pointcut, transactionAdvice());
    }

    @Bean
    public SqlSessionFactory sqlSessionFactory() throws Exception {
        log.info("init sqlSessionFactory");
        Resource[] res = new PathMatchingResourcePatternResolver().getResources("classpath:sqlmap/**/*.xml");
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setMapperLocations(res);
        factoryBean.setDataSource(jdbcTemplate.getDataSource());
        factoryBean.setPlugins(new Interceptor[] {new MyBatisExecutionInterceptor()});

        return factoryBean.getObject();
    }
}
