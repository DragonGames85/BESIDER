import './App.css';
import ArticleBlock from './components/article/articleBlock';
import Footer from './components/footer';
import Header from './components/header';

function App() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <ArticleBlock />
            <Footer />
        </div>
    );
}

export default App;
