import React, { useState, useEffect } from 'react';
import { Home, ChevronLeft, ChevronDown, Loader } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BottomNavigation from '../components/BottomNavigation';
import DiscountCodeModal from '../components/DiscountCodeModal';
import { getStoreDetails } from '../services/api';
import { stores } from '../mock/stores';

const StorePage = () => {
  const { storeName } = useParams();
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [expandedTypes, setExpandedTypes] = useState({});
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  
  const storeBasicInfo = stores.find(s => s.urlSlug === storeName);
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    getStoreDetails(storeName)
      .then(data => {
        if (data) {
          setStoreData(data);
        } else {
          setError('فروشگاه یافت نشد');
        }
      })
      .catch(err => {
        setError('خطا در دریافت اطلاعات');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [storeName]);
  
  // Function to count words
  const countWords = (text) => text?.trim().split(/\s+/).length || 0;
  
  // اگر loading یا error است
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f5f5]" dir="rtl">
        <Navigation />
        <main className="flex-grow flex items-center justify-center pt-40">
          <div className="flex flex-col items-center gap-4">
            <Loader size={48} className="text-orange-500 animate-spin" />
            <p className="text-gray-600">درحال بارگذاری...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !storeData || !storeBasicInfo) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f5f5]" dir="rtl">
        <Navigation />
        <main className="flex-grow flex items-center justify-center pt-40">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || 'فروشگاه یافت نشد'}</p>
            <Link to="/" className="text-orange-500 hover:text-orange-600">
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // ترکیب داده‌های اساسی و دتایل
  const displayData = {
    ...storeData,
    posterImage: storeBasicInfo.posterImage,
    logo: storeBasicInfo.logo,
  };

  // Map category name to slug
  const getCategorySlug = (categoryName) => {
    const categorySlugMap = {
      'غذا و نوشیدنی': 'food',
      'زیبایی و سلامت': 'beauty',
      'تکنولوژی و دیجیتال': 'tech',
      'آموزش': 'education'
    };
    return categorySlugMap[categoryName] || '';
  };

  return (
    // Main page settings: RTL, IRANYekan font, overall background color
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]" dir="rtl" style={{ fontFamily: 'IRANYekan, sans-serif' }}>
      
      {/* Assuming the Navigation component has position: fixed */}
      <Navigation />
      
      {/* Key Fix: pt-28. 
          This top padding ensures the content clears the fixed navigation bar and resolves the overlap issue.
      */}
      <main className="flex-grow w-full pb-12">
        
        {/* --- Breadcrumb Section --- */}
        <div className="w-full" style={{ paddingTop: '12px', paddingLeft: '120px', paddingRight: '120px', marginBottom: '24px' }}>
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="flex items-center text-gray-500 hover:text-gray-600 transition-colors">
              <Home size={16} className="ml-1" />
              خانه
            </Link>
            <ChevronLeft size={14} className="text-gray-400" />
            <Link 
              to={`/category/${getCategorySlug(displayData.category)}`}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {displayData.category}
            </Link>
            <ChevronLeft size={14} className="text-gray-400" />
            <span className="text-orange-500 font-medium cursor-default">{displayData.displayName}</span>
          </nav>
        </div>

        {/* --- Store Header Section (Store Info) --- */}
        <div className="w-full mb-12" style={{ paddingLeft: '120px', paddingRight: '120px' }}>
          <div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              
              {/* Logo */}
              <div 
                className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 bg-white rounded-xl flex items-center justify-center p-4 border border-gray-100"
                style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
              >
                {/* Shows the name if the image fails to load */}
                <img 
                  src={displayData.logo} 
                  alt={displayData.displayName} 
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
                />
                <span className="hidden text-gray-400 text-xs text-center">{displayData.displayName}</span>
              </div>

              {/* Text Information */}
              <div className="flex-1 pt-2">
                <h1 className="text-xl md:text-2xl font-bold text-[#3A3A3A] mb-3">
                  {displayData.tagline}
                </h1>
                
                <p className="text-md text-gray-500 mb-4 font-bold">
                  {displayData.slogan}
                </p>
                
                <div className="relative">
                  <p className={`text-sm text-gray-600 leading-7 text-justify pl-4 ${!expandedDescription ? 'line-clamp-2' : ''}`}>
                    {displayData.description}
                  </p>
                  
                  {countWords(displayData.description) > 50 && (
                    <button 
                      onClick={() => setExpandedDescription(!expandedDescription)}
                      className="text-orange-500 hover:text-orange-600 text-sm font-medium mt-2 flex items-center gap-1 transition-colors"
                    >
                      {expandedDescription ? 'بستن' : 'مشاهده بیشتر'}
                      <ChevronDown size={14} className={`transform transition-transform ${expandedDescription ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Active Offers Section --- */}
        <div className="w-full" style={{ paddingLeft: '120px', paddingRight: '120px' }}>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-bold text-[#3A3A3A]"> تخفیف‌های فعال</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 332px)', gap: '24px', justifyContent: 'start', alignItems: 'start' }}>
              {displayData.discountTypes && displayData.discountTypes.map((discountType) => (
                <div 
                  key={discountType.type_id}
                  className="bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  style={{ border: '1px solid #e5e7eb', borderRadius: '8px' }}
                >
                  {/* Offer Image */}
                  <div className="h-48 bg-gray-100 overflow-hidden relative group">
                    <img 
                      src={displayData.posterImage} 
                      alt={discountType.type} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
                  </div>

                  {/* Offer Content */}
                  <div className="p-5 flex flex-col gap-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <h3 className="text-lg font-bold text-[#3A3A3A]">
                      {discountType.description}
                    </h3>

                    {/* Description button */}
                    <button 
                      onClick={() => setExpandedTypes(prev => ({
                        ...prev,
                        [discountType.type_id]: !prev[discountType.type_id]
                      }))}
                      className="text-gray-500 text-md flex items-center justify-between w-full py-2 border-y border-gray-100 hover:text-gray-700 transition-colors"
                    >
                      <span>شرایط استفاده</span>
                      <ChevronDown 
                        size={16} 
                        className={`transform transition-transform ${expandedTypes[discountType.type_id] ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Expanded Terms */}
                    {expandedTypes[discountType.type_id] && (
                      <p className="text-sm text-gray-600 whitespace-pre-line">
                        {discountType.usageTerms}
                      </p>
                    )}

                    {/* Call to Action button */}
                    <button 
                      onClick={() => {
                        setSelectedDiscount(discountType);
                        setModalOpen(true);
                      }}
                      className="w-full bg-[#FF6C08] hover:bg-[#e65c00] text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-md hover:shadow-orange-200"
                      style={{ marginTop: '45px' }}
                    >
                      دریافت کد تخفیف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      <DiscountCodeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        discountCode={selectedDiscount?.code}
        userName="جوپن" // TODO: از auth/context بگیر
        storeName={displayData?.displayName}
        storeLogo={storeBasicInfo?.logo}
      />
      
      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default StorePage;