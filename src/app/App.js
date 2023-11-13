import Content from '../features/content/Content';
import Header from '../features/header/Header';
import Navbar from '../features/navbar/Navbar';

function App() {
  return (
    <>
      <Header />
      <section>
        <aside>
          <Navbar />
        </aside>
        <main>
          <Content />
        </main>
      </section>
    </>
  );
}

export default App;
