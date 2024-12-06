import { Link } from "next-view-transitions";

export default function List() {
    return <>
        <div style={{display: "flex", marginBottom: "3rem" }}>
        <ul>
            <li>
                CS240 (Unfinished)
                <ul style={{padding: "revert"}}>
                    <li>
                        <Link href="/school/cs240/mt">Midterm Prep</Link>
                    </li>
                </ul>
            </li>
            <li>
                CS247
                <ul style={{padding: "revert"}}>
                    <li>
                        <Link href="/school/cs247/mt">Midterm Prep</Link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    </>
}