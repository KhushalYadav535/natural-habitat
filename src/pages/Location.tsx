import React from 'react';
import LocationMap from '../../components/LocationMap';

export default function Location() {
  return (
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <section className="relative py-16 bg-green-600 text-white">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Visit Our Reserve
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Discover the natural beauty of Wild Haven Reserve and plan your visit to experience wildlife in their natural habitat.
            </p>
          </div>
        </div>
      </section>

      {/* Location Information */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Map Component */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <LocationMap />
            </div>

            {/* Location Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-4">
                  Location & Directions
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Wild Haven Reserve is located in the heart of pristine wilderness, 
                  offering visitors a unique opportunity to observe wildlife in their natural habitat.
                </p>
              </div>

              {/* Address */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-green-800 mb-3">
                  Address
                </h3>
                <p className="text-gray-700">
                  123 Wildlife Trail<br />
                  Nature Valley, NV 12345<br />
                  United States
                </p>
              </div>

              {/* Visiting Hours */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-green-800 mb-3">
                  Visiting Hours
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday:</span>
                    <span>7:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Holidays:</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-green-800 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                  <p><strong>Email:</strong> info@wildhavenreserve.com</p>
                  <p><strong>Emergency:</strong> (555) 999-8888</p>
                </div>
              </div>

              {/* Getting There */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-green-800 mb-3">
                  Getting There
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <h4 className="font-semibold text-green-700">By Car:</h4>
                    <p>Take Highway 101 North, exit at Nature Valley Road, follow signs for 5 miles.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700">By Public Transport:</h4>
                    <p>Bus route 45 stops at Nature Valley Station, 2 miles from the reserve.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Plan Your Visit
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Make the most of your visit to Wild Haven Reserve with our helpful tips and guidelines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎒</span>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                What to Bring
              </h3>
              <p className="text-gray-600">
                Comfortable walking shoes, water, sunscreen, binoculars, and a camera to capture wildlife moments.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Guidelines
              </h3>
              <p className="text-gray-600">
                Stay on marked trails, keep a safe distance from wildlife, and follow all posted safety guidelines.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎫</span>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Admission
              </h3>
              <p className="text-gray-600">
                Adults: $15, Children (under 12): $8, Seniors: $12. Group rates available for 10+ visitors.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 