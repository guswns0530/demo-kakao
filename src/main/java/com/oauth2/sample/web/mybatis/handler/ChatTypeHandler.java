package com.oauth2.sample.web.mybatis.handler;

import com.oauth2.sample.domain.chat.dto.ChatType;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ChatTypeHandler extends BaseTypeHandler<ChatType> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, ChatType parameter, JdbcType jdbcType) throws SQLException {
        ps.setString(i, parameter.getTypeCode() + "");
    }

    @Override
    public ChatType getNullableResult(ResultSet rs, String columnName) throws SQLException {
        return ChatType.lookUp(Integer.parseInt(rs.getString(columnName)));
    }

    @Override
    public ChatType getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        return ChatType.lookUp(Integer.parseInt(rs.getNString(columnIndex)));
    }

    @Override
    public ChatType getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        return ChatType.lookUp(Integer.parseInt(cs.getNString(columnIndex)));
    }
}
