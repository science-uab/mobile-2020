import {makeStyles} from '@material-ui/core/styles'

const useClasses = makeStyles(theme => ({
    bigBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        overflowX: "scroll",
        display: 'block'
    },
    about: {
        position: "relative",
        display: 'block'
    },
    background: {
        boxShadow: e.shadows[6]
    },
    aboutInner: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "absolute"
    },
    euBox: {
        width: "72px",
        height: "72px",
        borderRadius: "50%",
        overflow: "hidden",
        border: "20px solid rgba(0,0,0,.54)"
    },
    eu: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    euName: {
        fontSize: "14pt",
        fontWeight: "500",
        color: "#fafafa"
    },
    euTexts: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
    },
    euDev: {
        fontSize: "8pt",
        color: "#fafafa",
        lineHeight: "5px",
        fontStyle: "italic"
    },
    euInfo: (t = {
        width: "calc(100% - 40px)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
        marginBottom: "10px"
    }, Object(za.a)(t, "justifyContent", "space-between"), Object(za.a)(t, "marginLeft", "20px"), Object(za.a)(t, "marginRight", "20px"), t),
    euInfoRow: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "45%",
        backgroundColor: e.palette.primary.main,
        justifyContent: "space-between",
        boxShadow: e.shadows[3],
        paddingTop: "10px",
        paddingBottom: "10px",
        borderRadius: "12px"
    },
    thanks: {
        width: "calc(100% - 20px)",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: "10px"
    },
    ltext: {
        marginLeft: "10px"
    },
    thanksLibrary: {
        flexDirection: "column",
        width: "calc(100% - 20px)"
    },
    last: {
        marginBottom: "20px"
    },
    lightGreen: {
        backgroundColor: e.palette.primary.light
    },
    list: {
        width: 'calc(100% - 20px)',
        margin: 0,
        padding: 0
    }
}))

export default useClasses
