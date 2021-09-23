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
                accesses: [],
                nonaccesses: []
            },
        ],
        accesses: [],
        nonaccesses: []
    }
]

const product_menu = [
    {
        icon: <Icon color="disable">shop</Icon>,
        title: 'nested_list.product_menu.title',
        items: [
            {
                icon: <Icon color="disable">shop</Icon>,
                to: '/product/category',
                title: 'nested_list.product_menu.new_product',
            }
        ],
    }
]

const settings_menu = [
    {
        icon: <Icon color="disable">build</Icon>,
        title: 'Settings',
        items: [
            {
                title: 'My Addresses',
                to: '/settings/address',
                items: [],
                accesses: [],
                nonaccesses: []
            },
            {
                // icon: <Icon color="disable">query_builder</Icon>,
                title: 'nested_list.shop_menu.setting',
                to: '/shop/setting',
                items: [],
                accesses: [],
                nonaccesses: []
            },
        ]
    },
]

export const menu = [
    ...shop_menu,
    ...product_menu,
    ...settings_menu
]