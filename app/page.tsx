"use client"

import React, { useState } from "react"
import { Copy } from "lucide-react"

interface CategoryAmenities {
  [key: string]: string
}

interface Categories {
  [key: string]: CategoryAmenities
}

const Home = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>({})
  const [copiedText, setCopiedText] = useState(false)
  const [baseUrl, setBaseUrl] = useState("")
  const [error, setError] = useState("")

  const categories: Categories = {
    'Essential Amenities': {
      '21': 'Elevator',
      '4': 'WiFi',
      '5': 'Air Conditioning',
      '8': 'Kitchen',
      '30': 'Heating',
      '33': 'Washer',
      '34': 'Dryer',
      '40': 'Essentials',
      '41': 'Shampoo',
      '45': 'Hair Dryer',
      '46': 'Iron',
      '47': 'Workspace'
    },
    'Kitchen & Dining': {
      '89': 'Microwave',
      '90': 'Coffee Maker',
      '91': 'Refrigerator',
      '92': 'Dishwasher',
      '95': 'Oven',
      '96': 'Stove',
      '236': 'Dining Table'
    },
    'Entertainment': {
      '1': 'Television',
      '151': 'Smart TV',
      '185': 'Sound System',
      '265': 'Netflix',
      '266': 'HBO GO',
      '267': 'Amazon Echo'
    },
    'Outdoor': {
      '99': 'BBQ Grill',
      '100': 'Patio/Balcony',
      '101': 'Backyard',
      '179': 'Outdoor Dining',
      '219': 'Fire Pit'
    },
    'Parking': {
      '9': 'Free Parking',
      '22': 'Garage',
      '23': 'Street Parking',
      '97': 'EV Charger',
      '287': 'Paid Parking'
    },
    'Views & Location': {
      '154': 'Mountain view',
      '155': 'Beach view',
      '578': 'View tower',
      '181': 'Balcony',
      '100': 'Patio/Balcony',
      '132': 'Waterfront',
      '133': 'Lake Access',
      '134': 'Beachfront',
      '674': 'Beach Access'
    },
    'Pool & Spa': {
      '7': 'Pool',
      '25': 'Hot Tub',
      '223': 'Sauna',
      '258': 'Private Pool',
      '260': 'Private Hot Tub'
    }
  }

  const parseExistingUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url)
      setBaseUrl(url.split("?")[0])

      const params = new URLSearchParams(parsedUrl.search)
      const existingAmenities: Record<string, boolean> = {}

      params.forEach((value, key) => {
        if (key === "amenities[]") {
          existingAmenities[value] = true
        }
      })

      setSelectedAmenities(existingAmenities)
      setError("")
    } catch (error: unknown) {
      void error
      setError("Please enter a valid Airbnb URL")
    }
  }

  const toggleAmenity = (code: string) => {
    setSelectedAmenities((prev) => ({
      ...prev,
      [code]: !prev[code],
    }))
  }

  const generateFullUrl = () => {
    const defaultBaseUrl = "https://www.airbnb.com/s/homes"
    try {
      const url = baseUrl ? new URL(baseUrl) : new URL(defaultBaseUrl)
      const params = new URLSearchParams(url.search)

      const nonAmenityParams = Array.from(params.entries()).filter(
        ([key]) => key !== "amenities[]"
      )

      const newParams = new URLSearchParams(nonAmenityParams)

      Object.entries(selectedAmenities)
        .filter(([, isSelected]) => isSelected)
        .forEach(([code]) => {
          newParams.append("amenities[]", code)
        })

      return `${url.origin}${url.pathname}${
        newParams.toString() ? "?" + newParams.toString() : ""
      }`
    } catch (error: unknown) {
      void error
      const params = new URLSearchParams()
      Object.entries(selectedAmenities)
        .filter(([, isSelected]) => isSelected)
        .forEach(([code]) => {
          params.append("amenities[]", code)
        })
      return `${defaultBaseUrl}${
        params.toString() ? "?" + params.toString() : ""
      }`
    }
  }

  const copyToClipboard = () => {
    const url = generateFullUrl()
    navigator.clipboard.writeText(url)
    setCopiedText(true)
    setTimeout(() => setCopiedText(false), 2000)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="p-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-[#FF385C]">
            Airbnb Amenity Selector
          </h2>
          <p className="text-gray-600 mb-4">
            Paste your Airbnb URL below or select amenities to generate URL
            parameters
          </p>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Paste Airbnb URL here (optional)"
              className="w-full text-black p-2 border rounded focus:border-[#FF385C] focus:ring-[#FF385C] focus:outline-none"
              onChange={(e) => parseExistingUrl(e.target.value)}
            />
            {error && <p className="text-[#FF385C] text-sm mt-1">{error}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(categories).map(([category, amenities]) => (
            <div key={category} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold mb-3 text-lg text-[#222222]">{category}</h3>
              <div className="space-y-2">
                {Object.entries(amenities).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => toggleAmenity(code)}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      selectedAmenities[code]
                        ? "bg-[#FFE1E3] text-[#FF385C]"
                        : "hover:bg-gray-50 text-[#222222]"
                    }`}
                  >
                    <span className="text-sm">
                      {name} ({code})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {(Object.values(selectedAmenities).some(Boolean) || baseUrl) && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <div className="mb-4">
              <h3 className="font-bold mb-2 text-[#222222]">Selected Amenities:</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedAmenities)
                  .filter(([, isSelected]) => isSelected)
                  .map(([code]) => {
                    let amenityName = ""
                    for (const category of Object.values(categories)) {
                      if (code in category) {
                        amenityName = category[code]
                        break
                      }
                    }
                    return (
                      <span
                        key={code}
                        className="px-2 py-1 bg-[#FFE1E3] text-[#FF385C] rounded text-sm"
                      >
                        {amenityName} ({code})
                      </span>
                    )
                  })}
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-[#222222]">Generated URL:</h3>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1 bg-[#FF385C] text-white rounded hover:bg-[#E31C5F] transition-colors"
              >
                <Copy size={16} />
                {copiedText ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200 break-all text-sm mb-3 text-[#222222]">
              {generateFullUrl()}
            </div>
            <div className="flex justify-center">
              <a
                href={generateFullUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded transition-colors"
              >
                Open in Airbnb →
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Home
