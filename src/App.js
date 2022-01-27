import { useEffect, useState } from "react";
import { fetchWeather } from "./api";

function Header() {
    return (
        <header className="hero is-link">
            <div className="hero-body">
                <p className="title">
                    <center><font size="7">天気予報</font></center>
                </p>
                <p className="subtitle">
                    <center>関東の天気予報を知れるよ</center>
                </p>
            </div>
        </header>
    );
}

function Loading() {
    return <p>Loading...</p>;
}


function Weather(props) {
    const { urls } = props;
    if (urls == null) {
        return <Loading />;
    }
    return (
        <div>
            <center>これは日本大学文理学部情報科学科 Webプログラミングの演習課題です．</center>
            <div class="container">
                <div class="notification is-primary">
                    <center><font size="5">発表元</font></center>
                </div>
            </div>
            <div class="box">
                <center>{urls.publishingOffice}</center>
            </div>

            <div class="container">
                <div class="notification is-primary">
                    <center><font size="5">発表日時</font></center>
                </div>
            </div>
            <div class="box">
                <center>{urls.reportDatetime}</center>
            </div>

            <div class="container">
                <div class="notification is-primary">
                    <center><font size="5">詳細</font></center>
                </div>
            </div>
            <div class="box">
                <center>{urls.text}</center>
            </div>
        </div>
    );
}

function Form(props) {
    function handleSubmit(event) {
        event.preventDefault();
        const { number } = event.target.elements;
        props.onFormSubmit(number.value);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <div className="select is-fullwidth">
                            <select name="number" defaultValue="130000">
                                <option value="130000">東京</option>
                                <option value="120000">千葉</option>
                                <option value="110000">埼玉</option>
                                <option value="090000">栃木</option>
                                <option value="140000">神奈川</option>
                                <option value="080000">茨城</option>
                                <option value="100000">群馬</option>
                            </select>
                        </div>
                    </div>
                    <div className="control">
                        <button type="submit" className="button is-dark">
                            Reload
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function Main() {
    const [urls, setUrls] = useState(null);
    useEffect(() => {
        fetchWeather('130000').then((urls) => {
            setUrls(urls);
        });
    }, []);

    function reloadWeather(number) {
        fetchWeather(number).then((urls) => {
            setUrls(urls);
        });
    }
    return (
        <main>
            <section className="section">
                <div className="container">
                    <Form onFormSubmit={reloadWeather} />
                </div>
            </section>
            <Weather urls={urls} />;
        </main>
    );
}

function Footer() {
    return (
        <footer class="footer">
            <div class="content has-text-centered">
                <a href="https://www.jma.go.jp/bosai/forecast/">気象庁API</a>を使ってサイトを作成しました．<br></br>
                The source code is licensed
                <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
                The website content
                is licensed <a href="https://creativecommons.org/licenses/by/4.0/legalcode.ja">CC BY</a>.
                <p><strong>This website is made by 5420086 Hinata Segawa</strong></p>
            </div>
        </footer>
    );
}

function App() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;