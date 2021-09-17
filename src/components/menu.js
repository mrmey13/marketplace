import React from 'react';
import Icon from '@material-ui/core/Icon';
import cs from '../const';

export const menu = [
    {
        icon: <Icon color="disable">query_builder</Icon>,
        title: 'TEST',
        to: '/',
        items: [],
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