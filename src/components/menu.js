import React from 'react';
import Icon from '@material-ui/core/Icon';
import { LocalMall, InsertChartRounded, AccountBalanceWallet, SettingsApplications } from '@material-ui/icons';
import cs from '../const';
import { isMarketplaceAdmin, isSoloUser } from '../service';

let baseRoute ="";
if (cs.routeBase.length > 0) {
    baseRoute = "/" + cs.routeBase;
}
const shop_menu = [
    {
        icon: <Icon color="disable">store</Icon>,
        title: 'nested_list.shop_menu.title',
        // to: '/',
        items: [
            {
                // icon: <Icon color="disable">query_builder</Icon>,
                title: 'nested_list.shop_menu.profile',
                to: baseRoute + '/shop/profile',
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
        icon: <LocalMall />,
        title: 'nested_list.product_menu.title',
        items: [
            {
                // icon: <Icon color="disable">shop</Icon>,
                to: baseRoute + '/product/list/all',
                title: 'nested_list.product_menu.all_products'
            },
            {
                // icon: <Icon color="disable">shop</Icon>,
                to: baseRoute + '/product/category',
                title: 'nested_list.product_menu.new_product'
            }
        ],
    }
]

const finance_menu = [
    {
        icon: <AccountBalanceWallet />,
        title: 'nested_list.finance_menu.title',
        items: [
            {
                // icon: <Icon color="disable">shop</Icon>,
                to: baseRoute + '/finance/wallet/card',
                title: 'nested_list.finance_menu.bank_accounts'
            },
        ],
    }
]

const data_menu = [
    {
        icon: <InsertChartRounded />,
        title: 'nested_list.data_menu.title',
        items: [
            {
                // icon: <Icon color="disable">shop</Icon>,
                to: baseRoute + '/datacenter/dashboard',
                title: 'nested_list.data_menu.business_insights'
            },
        ],
    }
]

const settings_menu = [
    {
        icon: <SettingsApplications />,
        title: 'nested_list.settings_menu.title',
        items: [
            {
                title: 'shop_settings.my_addresses',
                to: baseRoute + '/settings/address',
                items: [],
                accesses: [],
                nonaccesses: []
            },
            {
                // icon: <Icon color="disable">query_builder</Icon>,
                title: 'shop_settings.setting',
                to: baseRoute + '/shop/setting',
                items: [],
                accesses: [],
                nonaccesses: []
            },
            {
                // icon: <Icon color="disable">query_builder</Icon>,
                title: 'MyAccount',
                to: baseRoute + '/my_account',
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
            to: baseRoute + '/product-list/all',
            title: 'nested_list.admin_menu.all_products'
        },
        {
            // icon: <Icon color="disable">shop</Icon>,
            to: baseRoute + '/attribute/list',
            title: 'Attribute Management'
        },
    ]
}]

export const menu = [
    ...(!isMarketplaceAdmin() && shop_menu || []),
    ...(!isMarketplaceAdmin() && product_menu || []),
    ...(!isMarketplaceAdmin() && finance_menu || []),
    ...(!isMarketplaceAdmin() && data_menu || []),
    ...(isMarketplaceAdmin() && admin_menu || []),
    ...(!isMarketplaceAdmin() && settings_menu || []),
]