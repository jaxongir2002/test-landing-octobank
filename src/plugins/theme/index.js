import Aura from '@primeuix/themes/aura';
import {definePreset} from "@primeuix/themes";

export default definePreset(Aura, {
    semantic: {
        bank: {
            50: '#E7EAF4',  // Очень светлый для фона
            100: '#C2CBE5',
            200: '#9EABD6',
            300: '#798CC7',
            400: '#556CB8',
            500: '#1A2D61',  // Основной bank
            600: '#162858',
            700: '#0F1C3F',  // Active
            800: '#2B437D',  // Hover
            900: '#0A132A'
        }
    },
    components: {
        skeleton: {
            colorScheme: {
                light: {
                    background: '#D9D9D9', // Цвет скелетона в светлой теме
                },
                dark: {
                    // Цвет скелетона в темной теме
                },
            },
        },

        inputtext: {
            borderColor: '#943E7D29',
            focusBorderColor: '#374867',
            hoverBorderColor: '#374867',
            disabledBackground: '#1F1A1D14',
            paddingX: "16px",
            paddingY: "16px",
            borderRadius: "12px",
            invalidBorderColor: "#BA1A1A",
            invalidColor: "#BA1A1A",
        },

        floatlabel: {
            color: '#4F444A',
            focusColor: "#4F444A",
            invalidColor: '#BA1A1A',
        },

        card: {
            color: '#1B1B1C',
            background: '#f5f6f7',
            border: {
                radius: "24px",
            }
        },
        checkbox: {
            borderColor: '#697684',
            hoverBorderColor: '#374867',
            checkedBackground: "#374867",
            checkedHoverBackground: "#374867",
            checkedBorderColor: "#374867",
            checkedHoverBorderColor: "#374867",
            checkedFocusBorderColor: "#374867",

            focus: {
                ring: {
                    color: '#ffffff',
                }
            }
        },

        inputotp: {
            inputLgWidth: "56px",
            inputLgHeight: "56px",
            inputLgPaddingY: "100px",
        },

        select: {
            borderColor: '#943E7D29',
            focusBorderColor: '#374867',
            hoverBorderColor: '#374867',
            disabledBackground: '#1F1A1D14',
            paddingX: "16px",
            paddingY: "16px",
            borderRadius: "12px",
            invalidBorderColor: "#BA1A1A",
            invalidColor: "#BA1A1A",
        },
        radiobutton: {
            checkedBackground: '#ffffff',
            checkedHoverBackground: '#ffffff',
            checkedHoverBorderColor: '#374867',

            borderColor: '#697684',

            icon: {
                checkedColor: "#374867",
                checkedHoverColor: "#374867",
            },
            checked: {
                borderColor: "#374867",
                borderHoverColor: "#374867",
                focusBorderColor: "#374867",
                ring: {
                    width: '10px'
                }
            },
            focus: {
                borderColor: "#374867",
                ring: {
                    width: '5px',
                    color: "#ffffff",
                    borderColor: "#ffffff"
                }
            }
        },
        stepper: {
            steppanel: {
                background: "transparent"
            },
        },
        tooltipBackground: "#EFEFF4",
        button: {
            paddingY: '14px',
            borderRadius: "16px",

            label: {
                fontWeight: "400",
            },


            colorScheme: {
                light: {
                    primary: {
                        background: '#374867',
                        hoverBackground: 'rgba(55,72,103,0.95)',
                        activeBackground: 'rgba(55,72,103,0.95)',
                        borderColor: "#374867",
                        hoverBorderColor: "#374867",
                        activeBorderColor: "#374867",
                    },

                    secondary: {
                        background: 'rgba(55,72,103,0.08)',
                        hoverBackground: 'rgba(55,72,103,0.05)',
                        activeBackground: '#862A7620',
                        color: '#374867',
                        hoverColor: '#374867',
                        activeColor: '#374867',
                        borderColor: "transparent",
                        hoverBorderColor: "transparent",
                        activeBorderColor: "transparent",
                    },
                },
                dark: {
                    // Цвет скелетона в темной теме
                },
            },
        }
    },
})