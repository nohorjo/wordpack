import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    root: {
        backgroundColor: '#F5FFFD',
        flex: 1,
    },
    container: {
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        flex: 1,
        fontSize: 24
    },
    languageButton: {
        flex: 1,
        marginRight: 5,
        marginLeft: 5
    },
    languageButtonList: {
        flex: 7,
        minWidth: 400
    },
    languageButtonView: {
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10
    },
    languageTitle: {
        fontSize: 20
    },
    leftButton: {
        flex: 1,
        alignItems: "flex-start"
    },
    rightButton: {
        flex: 1,
        alignItems: "flex-end"
    },
    bottomButtons: {
        flex: 1,
        alignItems: "flex-end"
    },
    card: {
        flex: 1
    }
});
