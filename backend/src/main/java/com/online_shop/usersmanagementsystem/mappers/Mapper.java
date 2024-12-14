package com.online_shop.usersmanagementsystem.mappers;

public interface Mapper<A,B> {
    B mapTo(A a);

    A mapFrom(B b);
}
