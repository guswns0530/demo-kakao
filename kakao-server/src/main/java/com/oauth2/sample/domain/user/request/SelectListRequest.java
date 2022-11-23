package com.oauth2.sample.domain.user.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
public class SelectListRequest {

    private ArrayList<String> list;
}
