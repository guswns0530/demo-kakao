package com.oauth2.sample.web.mybatis.handler;

import com.oauth2.sample.domain.room.dto.RoomType;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.springframework.util.StringUtils;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class RoomTypeHandler extends BaseTypeHandler<RoomType> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, RoomType parameter, JdbcType jdbcType) throws SQLException {
        ps.setString(i, parameter.getTypeCode() + "");
    }

    @Override
    public RoomType getNullableResult(ResultSet rs, String columnName) throws SQLException {
        String string = rs.getString(columnName);

        if (!StringUtils.hasText(string)) {
            return null;
        }

        return RoomType.lookUp(Integer.parseInt(string));
    }

    @Override
    public RoomType getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String string = rs.getNString(columnIndex);

        if (!StringUtils.hasText(string)) {
            return null;
        }

        return RoomType.lookUp(Integer.parseInt(string));
    }

    @Override
    public RoomType getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String string = cs.getNString(columnIndex);

        if (!StringUtils.hasText(string)) {
            return null;
        }

        return RoomType.lookUp(Integer.parseInt(string));
    }
}