import Hero from "@/components/heroSection/Hero";
import About from "@/features/about/About";
import BlogSection from "@/features/blogSection/BlogSection";
import Testimonials from "@/features/testimonials";
import ValueProp from "@/features/value-prep/valuePrep";
import MediaSection from "@/features/media-section/MediaSection";
import ContactSection from "@/features/contact/ContactSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <ValueProp />
      <BlogSection />
      <MediaSection />
      <Testimonials />
      <ContactSection />
    </div>
  );
}