import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';

export default function ClientsPage() {
  return (
    <main>
      <Clients />
      <section className="relative overflow-hidden bg-dark py-20">
        <div className="container-x px-6">
          <h3 className="font-heading text-2xl text-white">Trusted Brands</h3>
          <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">
            {['TATA', 'NOKIA', 'JW Marriott', 'Government', 'Education', 'Corporate'].map((b) => (
              <div key={b} className="flex items-center justify-center rounded-lux bg-white/5 p-4">
                <span className="text-white/80">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </main>
  );
}
