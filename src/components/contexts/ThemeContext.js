import React, { useState, useEffect } from 'react';
import { createMuiTheme, createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

export const ThemeContext = React.createContext();

export function MyThemeProvider(props) {
    const [isDark, setDark] = useState(false);
    const [Color, setColor] = useState('')
    //Table
    const [TableHeadColor, setTableHeadColor] = useState('')
    const [TableBodyColor, setTableBodyColor] = useState('')
    const darkTheme = createTheme({
        palette: {
            type: isDark? 'dark' : 'light'
        },
        // overrides: {
        //     MuiTableCell: {
        //         root: {
        //             // backgroundColor: 'green'
        //         },
        //         head: {
        //             backgroundColor:TableHeadColor
        //         },
        //         body: {
        //             backgroundColor:TableBodyColor
        //         }
        //     },
        // },
    });

    const handleThemeChange = () => {
        localStorage.setItem('aidriven-general-theme', !isDark);
        setDark(!isDark);
    }

    // const handleTableHeadThemeChange = (hexValue) => {
    //     setTableHeadColor(hexValue);
    // }
    // const handleTableBodyThemeChange = (hexValue) => {
    //     setTableBodyColor(hexValue);
    // }
    useEffect(() => {
        const theme = localStorage.getItem('aidriven-general-theme');
        if (theme) setDark(JSON.parse(theme));
    }, [])

    return (
        <ThemeContext.Provider
            value={{
                // handleTableBodyThemeChange: handleTableBodyThemeChange,
                // handleTableHeadThemeChange: handleTableHeadThemeChange,
                handleThemeChange: handleThemeChange,
                isDark: isDark,
                // TableBodyColor: TableBodyColor,
                // TableHeadColor: TableHeadColor,
            }}
        >
            <ThemeProvider theme={darkTheme}>
                {props.children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeContext

