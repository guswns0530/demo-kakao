package com.oauth2.sample.web.mybatis.handler;

import com.oauth2.sample.domain.chat.dto.ChatStatus;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.springframework.util.StringUtils;

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
        String string = rs.getString(columnName);

        if (!
                StringUtils.hasText(string)) {
            return null;
        }

        return ChatStatus.lookUp(Integer.parseInt(string));
    }

    @Override
    public ChatStatus getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String string = rs.getNString(columnIndex);

        if (!StringUtils.hasText(string)) {
            return null;
        }

        return ChatStatus.lookUp(Integer.parseInt(string));
    }

    @Override
    public ChatStatus getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String string = cs.getNString(columnIndex);

        if (!StringUtils.hasText(string)) {
            return null;
        }

        return ChatStatus.lookUp(Integer.parseInt(string));
    }
}