import React, { useState, useEffect } from 'react';

export const TableSettingContext = React.createContext();

export function TableSettingProvider(props) {
    const [table_height, setTableHeight] = useState(650);
    const [auto_reload, setAutoReload] = useState(false);
    const [interval_time, setInterval] = useState(30);

    const handleHeightChange = (height) => {
        setTableHeight(height);
    }

    const handleAutoReload = (value) => {
        setAutoReload(value);
    }

    const handleIntervalTime = (time) => {
        setInterval(time);
    }

    const saveData = () => {
        const data = { table_height: table_height, auto_reload: auto_reload, interval_time: interval_time };
        localStorage.setItem('etraining-tablesetting', JSON.stringify(data));
    }

    useEffect(() => {
        const local = localStorage.getItem('etraining-tablesetting');

        if (local) {
            const setting = JSON.parse(local);
            setTableHeight(setting.table_height);
            setAutoReload(setting.auto_reload);
            setInterval(setting.interval_time);
        }
    }, []);

    useEffect(() => {
        saveData();
    }, [table_height, auto_reload, interval_time]);

    return (
        <TableSettingContext.Provider
            value={{
                handleHeightChange: handleHeightChange,
                handleAutoReload: handleAutoReload,
                handleIntervalTime: handleIntervalTime,
                tableheight: table_height,
                autoreload: auto_reload,
                intervaltime: interval_time
            }}
        >
            {props.children}
        </TableSettingContext.Provider>
    )
}