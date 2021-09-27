import React from 'react';
import Icon from '@material-ui/core/Icon';
import { LocalMall } from '@material-ui/icons';
import cs from '../const';
import {isMarketplaceAdmin, isSoloUser} from '../service';
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
    },
    // {
    //     icon: <LocalMall />,
    //     title: 'Products',
    //     // to: '/',
    //     items: [
    //         {
    //             title: 'Add New Product',
    //             to: '/product/category',
    //             items: [],
    //             accesses: [],
    //             nonaccesses: []
    //         },
    //         {
    //             title: 'Create Product',
    //             to: '/product/new',
    //             items: [],
    //             accesses: [],
    //             nonaccesses: []
    //         }
    //     ],
    //     accesses: [],
    //     nonaccesses: []
    // }
]

const product_menu = [
    {
        icon: <LocalMall/>,
        title: 'nested_list.product_menu.title',
        items: [
            // {
            //     // icon: <Icon color="disable">shop</Icon>,
            //     to: '/product-list/all',
            //     title: 'nested_list.product_menu.all_products'
            // },
            {
                // icon: <Icon color="disable">shop</Icon>,
                to: '/product/category',
                title: 'nested_list.product_menu.new_product'
            }
        ],
    }
]

const settings_menu = [
    {
        icon: <Icon color="disable">build</Icon>,
        title: 'nested_list.settings_menu.title',
        items: [
            {
                title: 'shop_settings.my_addresses',
                to: '/settings/address',
                items: [],
                accesses: [],
                nonaccesses: []
            },
            {
                // icon: <Icon color="disable">query_builder</Icon>,
                title: 'shop_settings.setting',
                to: '/shop/setting',
                items: [],
                accesses: [],
                nonaccesses: []
            },
            {
                // icon: <Icon color="disable">query_builder</Icon>,
                title: 'MyAccount',
                to: '/my_account',
                items: [],
                accesses: [],
                nonaccesses: []
            },
        ]
    },
]

const admin_menu = [{
    icon: <Icon color="disable">admin_panel_settings</Icon>,
    title: 'nested_list.admin_menu.title',
    items: [
        {
            // icon: <Icon color="disable">shop</Icon>,
            to: '/product-list/all',
            title: 'nested_list.admin_menu.all_products'
        },
    ]
}]

export const menu = [
    ...(!isMarketplaceAdmin() && shop_menu || []),
    ...(!isMarketplaceAdmin() && product_menu || []),
    ...(isMarketplaceAdmin() && admin_menu || []),
    ...(!isMarketplaceAdmin() && settings_menu || []),
]