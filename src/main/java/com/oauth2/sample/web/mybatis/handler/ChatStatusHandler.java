package com.oauth2.sample.web.mybatis.handler;

import com.oauth2.sample.domain.chat.dto.ChatStatus;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ChatStatusHandler extends BaseTypeHandler<ChatStatus> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, ChatStatus parameter, JdbcType jdbcType) throws SQLException {
        ps.setString(i, parameter.getStatusCode() + "");
    }

    @Override
    public ChatStatus getNullableResult(ResultSet rs, String columnName) throws SQLException {
        return ChatStatus.lookUp(Integer.parseInt(rs.getString(columnName)));
    }

    @Override
    public ChatStatus getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        return ChatStatus.lookUp(Integer.parseInt(rs.getNString(columnIndex)));
    }

    @Override
    public ChatStatus getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        return ChatStatus.lookUp(Integer.parseInt(cs.getNString(columnIndex)));
    }
}
