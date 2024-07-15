export default function About() {
    return (
        <>
            <div className="about">
                <h1>About me!</h1>
                <img src="/images/me.jpeg" alt="" className="about__image" />
                <p>
                    I'm a Canadian amateur radio operator, holding Basic with
                    Honors and Advanced licenses. Feel free to explore my{" "}
                    <a href="https://nicholasficara.dev">personal website</a> or
                    my <a href="https://www.qrz.com/db/VA3NDF">QRZ</a>, linked
                    below in the footer. I write code both professionally and
                    unprofessionally. Feel free to drop me a line at{" "}
                    <a href="mailto:me@nicholasficara.dev">
                        me@nicholasficara.dev
                    </a>
                    .
                </p>
            </div>
        </>
    );
}
