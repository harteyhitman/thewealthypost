import Hero from "@/components/heroSection/Hero";
import BlogSection from "@/features/blogSection/BlogSection";
import Testimonials from "@/features/testimonials";
import ValueProp from "@/features/value-prep/valuePrep";

export default function Home() {
  return (
    <div>
      <Hero />
      <ValueProp />
      <Testimonials />
      <BlogSection />
    </div>
  );
}