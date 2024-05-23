import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <section className="mt-40">
        <h1 className="text-blue-500 text-4xl md:text-5xl mb-3 font-semibold leading-tight text-center md:text-start">
          Zylo Blog
        </h1>
        <div className="flex justify-center h-96 mt-40">
          <p className="text-gray-400">Nothing to see here yet</p>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
