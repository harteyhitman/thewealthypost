import Hero from "@/components/heroSection/Hero";
import Testimonials from "@/features/testimonials";
import ValueProp from "@/features/value-prep/valuePrep";

export default function Home() {
  return (
    <div>
      <Hero />
      <ValueProp />
      <Testimonials />
    </div>
  );
}