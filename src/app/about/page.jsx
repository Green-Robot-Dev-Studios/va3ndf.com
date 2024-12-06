import { Link } from "next-view-transitions";

export default function About() {
    return (
        <>
            <div className="about">
                <h1>About me!</h1>
                <img src="/images/me.jpeg" alt="" className="about__image" />
                <p>
                    I'm a Canadian amateur radio operator, holding Basic with
                    Honors and Advanced licenses. Feel free to explore my{" "}
                    <Link href="https://nicholasficara.dev">personal website</Link> or
                    my <Link href="https://www.qrz.com/db/VA3NDF">QRZ</Link>, linked
                    below in the footer. I write code both professionally and
                    unprofessionally. Feel free to drop me a line at{" "}
                    <Link href="mailto:me@nicholasficara.dev">
                        me@nicholasficara.dev
                    </Link>
                    .
                </p>
            </div>
        </>
    );
}
