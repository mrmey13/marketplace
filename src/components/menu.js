import React from 'react';
import Icon from '@material-ui/core/Icon';
import cs from '../const';

const shop_menu = [
    {
        icon: <Icon color="disable">store</Icon>,
        title: 'nested_list.shop_menu.title',
        // to: '/',
        items: [
            {
                // icon: <Icon color="disable">query_builder</Icon>,
                title: 'nested_list.shop_menu.profile',
                to: '/shop/profile',
                items: [],
                accesses:[],
                nonaccesses: []
            },
        ],
        accesses:[],
        nonaccesses: []
    },
]

export const menu = [
    ...shop_menu
]