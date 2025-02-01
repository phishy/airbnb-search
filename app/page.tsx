"use client"

import React, { useState } from "react"
import { Copy, Shield, Home, Utensils, Tv, TreePine, Car, Mountain, Waves, Baby, Accessibility, Dumbbell, Bath } from "lucide-react"

interface CategoryAmenities {
  [key: string]: string
}

interface Categories {
  [key: string]: CategoryAmenities
}

const AirbnbLogo = () => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 fill-[#FF385C]"
    aria-hidden="true"
  >
    <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.011l-.176.185c-2.044 2.1-4.267 3.42-6.414 3.615l-.28.019-.267.006C5.377 31 2.5 28.584 2.5 24.522l.005-.469c.026-.928.23-1.768.83-3.244l.216-.524c.966-2.298 6.083-12.989 7.707-16.034C12.537 1.963 13.992 1 16 1zm0 2c-1.239 0-2.053.539-2.987 2.21l-.523 1.008c-1.926 3.776-6.06 12.43-7.031 14.692l-.345.836c-.427 1.071-.573 1.655-.605 2.24l-.009.33v.206C4.5 27.395 6.411 29 8.857 29c1.773 0 3.87-1.236 5.831-3.354-2.295-2.938-3.855-6.45-3.855-8.91 0-2.913 1.933-5.386 5.178-5.386 3.245 0 5.178 2.473 5.178 5.386 0 2.456-1.555 5.96-3.855 8.907C19.277 27.766 21.37 29 23.142 29c2.447 0 4.358-1.605 4.358-4.478l-.004-.411c-.019-.672-.17-1.296-.714-2.62l-.248-.6c-1.065-2.478-5.993-12.768-7.538-15.664C18.053 3.539 17.24 3 16 3zm.01 10.316c-2.01 0-3.177 1.514-3.177 3.42 0 1.797 1.18 4.665 2.93 7.001.23.309.463.591.685.855l.227.27.068.08c.441-.504.84-1.03 1.197-1.572l.109-.17c1.749-2.336 2.929-5.204 2.929-7.001 0-1.906-1.166-3.42-3.177-3.42z" />
  </svg>
)

const categoryIcons = {
  'Safety & Security': Shield,
  'Essential Amenities': Home,
  'Kitchen & Dining': Utensils,
  'Entertainment': Tv,
  'Outdoor': TreePine,
  'Parking': Car,
  'Views & Location': Mountain,
  'Pool & Spa': Waves,
  'Family Friendly': Baby,
  'Accessibility': Accessibility,
  'Exercise & Recreation': Dumbbell,
  'Bathroom & Comfort': Bath,
} as const

const HomePage = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<
    Record<string, boolean>
  >({})
  const [copiedText, setCopiedText] = useState(false)
  const [baseUrl, setBaseUrl] = useState("")
  const [error, setError] = useState("")
  const [originalParams, setOriginalParams] = useState<URLSearchParams | null>(
    null
  )
  const [showUrl, setShowUrl] = useState(false)

  const categories: Categories = {
    "Safety & Security": {
      "35": "Smoke alarm",
      "36": "Carbon monoxide alarm",
      "37": "First aid kit",
      "39": "Fire extinguisher",
      "51": "Self check-in",
      "52": "Smart lock",
      "53": "Keypad",
      "54": "Lockbox",
      "229": "Security cameras",
      "231": "Alarm system",
      "232": "Safe",
    },
    "Essential Amenities": {
      "21": "Elevator",
      "4": "WiFi",
      "5": "Air Conditioning",
      "30": "Heating",
      "33": "Washer",
      "34": "Dryer",
      "40": "Essentials",
      "41": "Shampoo",
      "45": "Hair Dryer",
      "46": "Iron",
      "47": "Workspace",
      "77": "Hot water",
      "85": "Bed linens",
      "86": "Extra pillows and blankets",
      "57": "Private entrance",
      "87": "Ethernet connection",
      "103": "Luggage dropoff allowed",
      "104": "Long term stays allowed",
    },
    "Kitchen & Dining": {
      "8": "Kitchen",
      "89": "Microwave",
      "90": "Coffee Maker",
      "91": "Refrigerator",
      "92": "Dishwasher",
      "93": "Dishes and silverware",
      "94": "Cooking basics",
      "95": "Oven",
      "96": "Stove",
      "146": "Mini fridge",
      "235": "Espresso machine",
      "236": "Dining Table",
      "251": "Toaster",
    },
    Entertainment: {
      "1": "Television",
      "2": "Cable TV",
      "151": "Smart TV",
      "185": "Sound System",
      "265": "Netflix",
      "266": "HBO GO",
      "267": "Amazon Echo",
      "152": "DVD player",
      "189": "Projector and screen",
    },
    Outdoor: {
      "99": "BBQ Grill",
      "100": "Patio/Balcony",
      "101": "Backyard",
      "179": "Outdoor Dining",
      "219": "Fire Pit",
      "280": "Outdoor furniture",
      "210": "Outdoor shower",
      "255": "Garden",
    },
    Parking: {
      "9": "Free Parking",
      "22": "Garage",
      "23": "Street Parking",
      "97": "EV Charger",
      "287": "Paid Parking",
      "10": "Paid parking off premises",
      "212": "Driveway parking",
      "213": "Underground parking",
    },
    "Views & Location": {
      "154": "Mountain view",
      "155": "Beach view",
      "578": "View tower",
      "181": "Balcony",
      "132": "Waterfront",
      "133": "Lake Access",
      "134": "Beachfront",
      "674": "Beach Access",
      "135": "Ski-in/Ski-out",
    },
    "Pool & Spa": {
      "7": "Pool",
      "25": "Hot Tub",
      "223": "Sauna",
      "224": "Steam room",
      "258": "Private Pool",
      "259": "Shared pool",
      "260": "Private Hot Tub",
      "261": "Shared hot tub",
      "240": "Infinity pool",
      "254": "Heated pool",
    },
    "Family Friendly": {
      "64": "High chair",
      "66": "Children's books and toys",
      "72": "Pack 'n play/Travel crib",
      "73": "Room-darkening shades",
      "74": "Children's dinnerware",
      "31": "Family/kid friendly",
      "59": "Baby monitor",
      "63": "Changing table",
      "65": "Baby safety gates",
      "243": "Children's pool",
    },
    Accessibility: {
      "6": "Wheelchair accessible",
      "115": "Step-free access",
      "116": "Wide entrance",
      "124": "Roll-in shower with chair",
      "125": "Accessible-height toilet",
      "121": "Wide doorway to bathroom",
      "122": "Fixed grab bars for shower",
      "296": "Step-free shower",
    },
    "Exercise & Recreation": {
      "15": "Gym",
      "227": "Exercise equipment",
      "256": "Private gym",
      "257": "Shared gym",
      "214": "Tennis court",
      "201": "Bikes",
      "515": "Ping Pong Table",
      "521": "Pool Table",
    },
    "Bathroom & Comfort": {
      "61": "Bathtub",
      "79": "Body soap",
      "283": "Walk-in shower",
      "275": "En suite bathroom",
      "78": "Private bathroom",
      "163": "Shower bathtub combo",
      "164": "Rain shower",
      "167": "Bidet",
      "168": "Heated towel rack",
    },
  }

  const parseExistingUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url)
      setBaseUrl(url.split("?")[0])

      // Store all original parameters
      const params = new URLSearchParams(parsedUrl.search)
      setOriginalParams(params)

      // Extract only amenities for selection state
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

      // Start with original parameters if they exist
      const params = originalParams
        ? new URLSearchParams(originalParams)
        : new URLSearchParams()

      // Remove only amenities parameters
      params.delete("amenities[]")

      // Add selected amenities
      Object.entries(selectedAmenities)
        .filter(([, isSelected]) => isSelected)
        .forEach(([code]) => {
          params.append("amenities[]", code)
        })

      return `${url.origin}${url.pathname}${
        params.toString() ? "?" + params.toString() : ""
      }`
    } catch (error: unknown) {
      void error
      // Fallback for invalid URLs
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
          <h2 className="text-2xl font-bold mb-2 text-[#FF385C] flex items-center gap-2">
            <AirbnbLogo />
            AirBNB Amenity Selector
          </h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Paste Airbnb URL here (optional)"
              className="w-full text-black p-2 border rounded focus:border-[#FF385C] focus:ring-[#FF385C] focus:outline-none"
              onChange={(e) => parseExistingUrl(e.target.value)}
            />
            {error && <p className="text-[#FF385C] text-sm mt-1">{error}</p>}
          </div>

          {(Object.values(selectedAmenities).some(Boolean) || baseUrl) && (
            <div className="mt-4 bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-2">
                  <a
                    href={generateFullUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1 bg-[#FF385C] text-white rounded hover:bg-[#E31C5F] transition-colors"
                  >
                    Open in Airbnb →
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1 bg-[#FF385C] text-white rounded hover:bg-[#E31C5F] transition-colors"
                  >
                    <Copy size={16} />
                    {copiedText ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={() => setShowUrl(!showUrl)}
                    className="flex items-center gap-2 px-3 py-1 border border-[#FF385C] text-[#FF385C] rounded hover:bg-[#FFE1E3] transition-colors"
                  >
                    {showUrl ? "Hide URL" : "Show URL"}
                  </button>
                </div>
              </div>

              {showUrl && (
                <div className="bg-gray-50 p-3 rounded border border-gray-200 break-all text-sm text-[#222222]">
                  {generateFullUrl()}
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
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
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(categories).map(([category, amenities]) => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons]
            return (
              <div key={category} className="bg-white rounded-lg shadow p-4">
                <h3 className="font-bold mb-3 text-lg text-[#222222] flex items-center gap-2">
                  {IconComponent && <IconComponent className="h-5 w-5 text-[#FF385C]" />}
                  {category}
                </h3>
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
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default HomePage
