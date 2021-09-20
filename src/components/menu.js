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
            {
                // icon: <Icon color="disable">query_builder</Icon>,
                title: 'Shop Settiengs',
                to: '/shop/setting',
                items: [],
                accesses:[],
                nonaccesses: []
            },
        ],
        accesses:[],
        nonaccesses: []
    },
    {
        icon: <Icon color="disable">build</Icon>,
        title: 'Settings',
        items: [
            {
                title: 'My Addresses',
                to: '/settings/address',
                items: [],
                accesses:[],
                nonaccesses: []
            },
        ]
    },
]

export const menu = [
    ...shop_menu
]