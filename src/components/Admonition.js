export default function ({type, children}) {
    let colors = {
        "normal": "#ddffdd",
        "danger": "#ffdddd",
        "idea": "#fffedd",
    }
    return <div style={{backgroundColor: colors[type], margin: "1rem", padding: "1rem", borderRadius: "0.4rem", borderLeft: "#00000099", borderLeftWidth: "0.4rem", borderLeftStyle: "inset", boxShadow: "0 0 0px 2px"}}>
        {children}
    </div>
}
