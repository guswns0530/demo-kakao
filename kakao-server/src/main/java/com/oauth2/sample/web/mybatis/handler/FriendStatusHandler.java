package com.oauth2.sample.web.mybatis.handler;

import com.oauth2.sample.domain.friend.dto.FriendStatus;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class FriendStatusHandler extends BaseTypeHandler<FriendStatus> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, FriendStatus parameter, JdbcType jdbcType) throws SQLException {
        ps.setString(i, parameter.getStatusCode() + "");
    }

    @Override
    public FriendStatus getNullableResult(ResultSet rs, String columnName) throws SQLException {
        return FriendStatus.lookUp(Integer.parseInt(rs.getString(columnName)));
    }

    @Override
    public FriendStatus getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        return FriendStatus.lookUp(Integer.parseInt(rs.getNString(columnIndex)));
    }

    @Override
    public FriendStatus getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        return FriendStatus.lookUp(Integer.parseInt(cs.getNString(columnIndex)));
    }
}
