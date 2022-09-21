package com.oauth2.sample.web.mybatis.handler;

import com.oauth2.sample.web.security.dto.UserStatus;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserStatusHandler extends BaseTypeHandler<UserStatus> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, UserStatus parameter, JdbcType jdbcType) throws SQLException {
        ps.setString(i, parameter.getStatusCode() + "");
    }

    @Override
    public UserStatus getNullableResult(ResultSet rs, String columnName) throws SQLException {
        return UserStatus.lookup(Integer.parseInt(rs.getString(columnName)));
    }

    @Override
    public UserStatus getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        return UserStatus.lookup(Integer.parseInt(rs.getNString(columnIndex)));
    }

    @Override
    public UserStatus getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        return UserStatus.lookup(Integer.parseInt(cs.getNString(columnIndex)));
    }
}
