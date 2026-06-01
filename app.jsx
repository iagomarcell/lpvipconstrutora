/* ============================================================
   LP-VIP CONSTRUTORA — App composition
   ============================================================ */
const App = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Solution />
      <Testimonials />
    </main>
    <Footer />
    <FloatingWA />
  </>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
