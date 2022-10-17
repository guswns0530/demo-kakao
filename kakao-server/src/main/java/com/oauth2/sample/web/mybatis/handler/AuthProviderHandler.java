package com.oauth2.sample.web.mybatis.handler;

import com.oauth2.sample.web.security.dto.AuthProvider;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AuthProviderHandler extends BaseTypeHandler<AuthProvider> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, AuthProvider parameter, JdbcType jdbcType) throws SQLException {
        ps.setString(i, parameter.name());
    }

    @Override
    public AuthProvider getNullableResult(ResultSet rs, String columnName) throws SQLException {
        return AuthProvider.valueOf(rs.getString(columnName));
    }

    @Override
    public AuthProvider getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        return AuthProvider.valueOf(rs.getNString(columnIndex));
    }

    @Override
    public AuthProvider getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        return AuthProvider.valueOf(cs.getNString(columnIndex));
    }
}
