import { useEffect } from "react";
import "../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import Compare from "@/components/modals/Compare";
import DemoModal from "@/components/modals/DemoModal";
import Login from "@/components/modals/Login";
import Register from "@/components/modals/Register";
import UserMenu from "@/components/modals/UserMenu";
import MobileMenu from "@/components/modals/MobileMenu";
import Quickview from "@/components/modals/Quickview";
import SearchModal from "@/components/modals/SearchModal";
import Toolbar from "@/components/modals/Toolbar";
import Context from "@/context/Context";
import ScrollTop from "@/components/common/ScrollTop";

import SizeGuide from "@/components/modals/SizeGuide";
import QuestionModal from "@/components/modals/QuestionModal";
import ShareModal from "@/components/modals/ShareModal";
import WOW from "@/utlis/wow";
import CartComponent from "@/components/modals/CartComponent";
import DbSidebar from "@/components/modals/DbSidebar";
import AppErrorBoundary from "@/components/common/AppErrorBoundary";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ScrollTopBehaviour from "./components/common/ScrollToTopBehaviour";
import HomePage from "./pages";
import HomePageFashion2 from "./pages/homes/home-fashion-02";
import HomePageElectronic from "./pages/homes/home-electronic";
import HomePageFurniture from "./pages/homes/home-furniture";
import HomePageFashionWoman from "./pages/homes/home-fashion-women";
import HomePageSkincare from "./pages/homes/home-skincare";
import HomePageBicycle from "./pages/homes/home-bicycle";
import HomePagePhoneCase from "./pages/homes/home-phonecase";
import HomePagePetAccessories from "./pages/homes/home-pet-accessories";
import HomePageSportwear from "./pages/homes/home-sportwear";
import HomePageJewwlry from "./pages/homes/home-jewelry";
import HomePageElectricAccessories from "./pages/homes/home-electric-accessories";
import HomePageMegaElectric from "./pages/homes/home-mega-electronic";
import HomePageVegetable from "./pages/homes/home-vegetable";
import HomePagePod from "./pages/homes/home-pod";
import HomePageBaby from "./pages/homes/home-baby";
import HomePagePlant from "./pages/homes/home-plant";
import ProductPageDefault from "./pages/products/shop-default";
import ProductPageLeftSidebar from "./pages/products/shop-left-sidebar";
import ProductPageRightSidebar from "./pages/products/shop-right-sidebar";
import ProductPageHoraizontalFilter from "./pages/products/shop-horizontal-filter";
import ProductPageCollectionList from "./pages/products/shop-collection-list";
import ProductPageSubCollection from "./pages/products/shop-sub-collection";
import ProductPageSubCollection2 from "./pages/products/shop-sub-collection-02";
import ProductPageGrid3Columns from "./pages/products/shop-grid-3-columns";
import ProductPageFullWidth from "./pages/products/shop-fullwidth";
import ProductPageLoadMoreButton from "./pages/products/shop-load-more-button";
import ProductPageInfiniteScroll from "./pages/products/shop-infinity-scroll";
import ProductPageFiltersidebar from "./pages/products/shop-filter-sidebar";
import ProductPageFilterHidden from "./pages/products/shop-filter-hidden";
import ProductPageStyle1 from "./pages/products/product-style-01";
import ProductPageStyle2 from "./pages/products/product-style-02";
import ProductPageStyle3 from "./pages/products/product-style-03";
import NewsletterPopup3Page from "./pages/homes/newsletter-popup-03";
import NewsletterPopup2Page from "./pages/homes/newsletter-popup-02";
import AccountPage from "./pages/dashboard/account-page";
import AdminPanelLayout from "./pages/dashboard/AdminPanelLayout";
import AdminCatalogPage from "./pages/dashboard/admin-panel/AdminCatalogPage";
import AdminPerfumeDetailPage from "./pages/dashboard/admin-panel/AdminPerfumeDetailPage";
import AdminUsersPage from "./pages/dashboard/admin-panel/AdminUsersPage";
import AdminUserDetailPage from "./pages/dashboard/admin-panel/AdminUserDetailPage";
import AdminOrdersPage from "./pages/dashboard/admin-panel/AdminOrdersPage";
import AdminOrderDetailPage from "./pages/dashboard/admin-panel/AdminOrderDetailPage";
import AdminAccessPage from "./pages/dashboard/admin-panel/AdminAccessPage";
import AdminContactMessagesPage from "./pages/dashboard/admin-panel/AdminContactMessagesPage";
import CatalogPage from "./pages/catalog";
import PerfumePage from "./pages/perfume/PerfumePage";
import SearchPage from "./pages/buscar";
import ProductDetailPage from "./pages/product-details/product-detail";
import ProductDetailPageRightThumbnail from "./pages/product-details/product-right-thumbnail";
import ProductDetailPageBottomThumbnail from "./pages/product-details/product-bottom-thumbnail";
import ProductDetailPageGrid from "./pages/product-details/product-grid";
import ProductDetailPageGrid2 from "./pages/product-details/product-grid-02";
import ProductDetailPageStacked from "./pages/product-details/product-stacked";
import ProductDetailPageDrawerSidebar from "./pages/product-details/product-drawer-sidebar";
import ProductDetailPageInnerZoom from "./pages/product-details/product-inner-zoom";
import ProductDetailPageInnerCircleZoom from "./pages/product-details/product-inner-circle-zoom";
import ProductDetailPageNoZoom from "./pages/product-details/product-no-zoom";
import ProductDetailPageExtarnalZoom from "./pages/product-details/product-external-zoom";
import ProductDetailPageOpenLightbox from "./pages/product-details/product-open-lightbox";
import ProductDetailPageVideo from "./pages/product-details/product-video";
import ProductDetailPage3D from "./pages/product-details/product-3d";
import ProductDetailPageTogether from "./pages/product-details/product-together";
import ProductDetailPageCountTimer from "./pages/product-details/product-countdown-timer";
import ProductDetailPageVolumeDiscount from "./pages/product-details/product-volume-discount";
import ProductDetailPageVolumeDiscountThumbnail from "./pages/product-details/product-volume-discount-thumbnail";
import ProductDetailPageSwatchDropdown from "./pages/product-details/product-swatch-dropdown";
import ProductDetailPageSwatchDropdownColor from "./pages/product-details/product-swatch-dropdown-color";
import ProductDetailPageSwatchImage from "./pages/product-details/product-swatch-image";
import ProductDetailPageSwatchImageSquare from "./pages/product-details/product-swatch-image-square";
import ProductDetailPagePickupAvaailable from "./pages/product-details/product-pickup-available";
import ProductDetailPageDescriptionVertical from "./pages/product-details/product-description-vertical";
import ProductDetailPageDescriptionTab from "./pages/product-details/product-description-tab";
import ProductDetailPageDecscriptionAccordion from "./pages/product-details/product-description-accordions";
import ProductDetailPageSideAccordion from "./pages/product-details/product-description-side-accordions";
import AboutUsPage from "./pages/otherPages/about-us";
import ContactusPage from "./pages/otherPages/contact-us";
import StoreLocationPage from "./pages/otherPages/store-location";
import FaqPage from "./pages/otherPages/faq";
import CartEmptyPage from "./pages/otherPages/cart-empty";
import CartDrawerPage2 from "./pages/otherPages/cart-drawer-v2";
import ViewCartPage from "./pages/otherPages/view-cart";
import BeforeYouLeavePage from "./pages/otherPages/before-you-leave";
import CookiesPage from "./pages/otherPages/cookies";
import NotFoundPage from "./pages/not-found";
import CommingSoonPage from "./pages/otherPages/coming-soon";
import BlogListPage1 from "./pages/blogs/blog-list-01";
import BlogListPage2 from "./pages/blogs/blog-list-02";
import BlogGridPage1 from "./pages/blogs/blog-grid-01";
import BlogGridPage2 from "./pages/blogs/blog-grid-02";
import BlogDetailsPage1 from "./pages/blogs/blog-single";
import AccountOrderPage from "./pages/dashboard/account-orders";
import AccountOrderDetailPage from "./pages/dashboard/account-orders/OrderDetailPage";
import WishlistPage from "./pages/otherPages/wish-list";
import AccountAddressPage from "./pages/dashboard/account-addresses";
import CheckoutPage from "./pages/otherPages/checkout";
import ThankYouPage from "./pages/otherPages/checkout/ThankYouPage";
import ComparePage from "./pages/otherPages/compare";
import PrivacyPolicyPage from "./pages/otherPages/privacy-policy";
import ProductDetailPageAffiliate from "./pages/product-details/product-affiliate";
import ProductDetailPageOutOfStock from "./pages/product-details/product-out-of-stock";
import ProductDetailPageBuyxGety from "./pages/product-details/product-buyx-gety";
import ProductDetailPageGroup from "./pages/product-details/product-group";
import HomePageJewwlry2 from "./pages/homes/home-jewelry2";
import HomePagePickleball from "./pages/homes/home-pickleball";
import HomePageHandcraft from "./pages/homes/home-handcraft";
import HomePageFurniture2 from "./pages/homes/home-furniture2";
import HomePageSkincare2 from "./pages/homes/home-skincare2";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);
  useEffect(() => {
    let lastScrollTop = 0;
    const delta = 5;
    let navbarHeight = 0;
    let didScroll = false;
    const header = document.querySelector("header");

    const handleScroll = () => {
      didScroll = true;
    };

    const checkScroll = () => {
      if (didScroll && header) {
        const st = window.scrollY || document.documentElement.scrollTop;
        navbarHeight = header.offsetHeight;

        if (st > navbarHeight) {
          if (st > lastScrollTop + delta) {
            // Scroll down
            header.style.top = `-${navbarHeight}px`;
          } else if (st < lastScrollTop - delta) {
            // Scroll up
            header.style.top = "0";
            header.classList.add("header-bg");
          }
        } else {
          // At top of page
          header.style.top = "";
          header.classList.remove("header-bg");
        }

        lastScrollTop = st;
        didScroll = false;
      }
    };

    // Initial measurement
    if (header) {
      navbarHeight = header.offsetHeight;
    }

    // Set up event listeners
    window.addEventListener("scroll", handleScroll);
    const scrollInterval = setInterval(checkScroll, 250);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(scrollInterval);
    };
  }, [pathname]); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Dynamically import Bootstrap
    import("bootstrap")
      .then((bootstrap) => {
        // Close any open modal
        const modalElements = document.querySelectorAll(".modal.show");
        modalElements.forEach((modal) => {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
          }
        });

        // Close any open offcanvas
        const offcanvasElements = document.querySelectorAll(".offcanvas.show");
        offcanvasElements.forEach((offcanvas) => {
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
          if (offcanvasInstance) {
            offcanvasInstance.hide();
          }
        });
      })
      .catch((error) => {
        console.error("Error loading Bootstrap:", error);
      });
  }, [pathname]); // Runs every time the route changes

  useEffect(() => {
    const wow = new WOW({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [pathname]);
  return (
    <>
      <Context>
        <AppErrorBoundary>
          <Routes>
            <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="home-fashion-02" element={<HomePageFashion2 />} />
            <Route path="home-electronic" element={<HomePageElectronic />} />
            <Route path="home-furniture" element={<HomePageFurniture />} />
            <Route
              path="home-fashion-women"
              element={<HomePageFashionWoman />}
            />
            <Route path="home-skincare" element={<HomePageSkincare />} />
            <Route path="home-bicycle" element={<HomePageBicycle />} />
            <Route path="home-phonecase" element={<HomePagePhoneCase />} />
            <Route
              path="home-pet-accessories"
              element={<HomePagePetAccessories />}
            />
            <Route path="home-sportwear" element={<HomePageSportwear />} />
            <Route path="home-jewelry" element={<HomePageJewwlry />} />
            <Route
              path="home-electric-accessories"
              element={<HomePageElectricAccessories />}
            />
            <Route
              path="home-mega-electronic"
              element={<HomePageMegaElectric />}
            />
            <Route path="home-vegetable" element={<HomePageVegetable />} />
            <Route path="home-pod" element={<HomePagePod />} />
            <Route path="home-baby" element={<HomePageBaby />} />
            <Route path="home-plant" element={<HomePagePlant />} />
            <Route path="home-jewelry2" element={<HomePageJewwlry2 />} />
            <Route path="home-pickleball" element={<HomePagePickleball />} />
            <Route path="home-handcraft" element={<HomePageHandcraft />} />
            <Route path="home-furniture2" element={<HomePageFurniture2 />} />
            <Route path="home-skincare2" element={<HomePageSkincare2 />} />

            <Route path="catalogo" element={<CatalogPage />} />
            <Route path="buscar" element={<SearchPage />} />
            <Route path="perfume/:id" element={<PerfumePage />} />
            <Route path="shop-default" element={<ProductPageDefault />} />
            <Route
              path="shop-left-sidebar"
              element={<ProductPageLeftSidebar />}
            />
            <Route
              path="shop-right-sidebar"
              element={<ProductPageRightSidebar />}
            />
            <Route
              path="shop-horizontal-filter"
              element={<ProductPageHoraizontalFilter />}
            />

            <Route
              path="shop-collection-list"
              element={<ProductPageCollectionList />}
            />
            <Route
              path="shop-sub-collection"
              element={<ProductPageSubCollection />}
            />
            <Route
              path="shop-sub-collection-02"
              element={<ProductPageSubCollection2 />}
            />
            <Route
              path="shop-grid-3-columns"
              element={<ProductPageGrid3Columns />}
            />

            <Route path="shop-fullwidth" element={<ProductPageFullWidth />} />

            <Route
              path="shop-load-more-button"
              element={<ProductPageLoadMoreButton />}
            />
            <Route
              path="shop-infinity-scroll"
              element={<ProductPageInfiniteScroll />}
            />
            <Route
              path="shop-filter-sidebar"
              element={<ProductPageFiltersidebar />}
            />
            <Route
              path="shop-filter-hidden"
              element={<ProductPageFilterHidden />}
            />
            <Route path="product-style-01" element={<ProductPageStyle1 />} />
            <Route path="product-style-02" element={<ProductPageStyle2 />} />
            <Route path="product-style-03" element={<ProductPageStyle3 />} />

            <Route
              path="newsletter-popup-02"
              element={<NewsletterPopup2Page />}
            />
            <Route
              path="newsletter-popup-03"
              element={<NewsletterPopup3Page />}
            />
            <Route path="account-page" element={<AccountPage />} />
            <Route path="painel" element={<AdminPanelLayout />}>
              <Route index element={<Navigate to="catalogo" replace />} />
              <Route path="catalogo" element={<AdminCatalogPage />} />
              <Route path="catalogo/:id" element={<AdminPerfumeDetailPage />} />
              <Route path="usuarios" element={<AdminUsersPage />} />
              <Route path="usuarios/:id" element={<AdminUserDetailPage />} />
              <Route path="pedidos" element={<AdminOrdersPage />} />
              <Route path="pedidos/:id" element={<AdminOrderDetailPage />} />
              <Route path="mensagens" element={<AdminContactMessagesPage />} />
              <Route path="acesso" element={<AdminAccessPage />} />
            </Route>

            <Route path="product-detail/:id" element={<ProductDetailPage />} />
            <Route
              path="product-right-thumbnail/:id"
              element={<ProductDetailPageRightThumbnail />}
            />

            <Route
              path="product-bottom-thumbnail/:id"
              element={<ProductDetailPageBottomThumbnail />}
            />
            <Route
              path="product-grid/:id"
              element={<ProductDetailPageGrid />}
            />
            <Route
              path="product-grid-02/:id"
              element={<ProductDetailPageGrid2 />}
            />
            <Route
              path="product-stacked/:id"
              element={<ProductDetailPageStacked />}
            />
            <Route
              path="product-drawer-sidebar/:id"
              element={<ProductDetailPageDrawerSidebar />}
            />
            <Route
              path="product-inner-zoom/:id"
              element={<ProductDetailPageInnerZoom />}
            />
            <Route
              path="product-inner-circle-zoom/:id"
              element={<ProductDetailPageInnerCircleZoom />}
            />
            <Route
              path="product-no-zoom/:id"
              element={<ProductDetailPageNoZoom />}
            />
            <Route
              path="product-external-zoom/:id"
              element={<ProductDetailPageExtarnalZoom />}
            />
            <Route
              path="product-open-lightbox/:id"
              element={<ProductDetailPageOpenLightbox />}
            />
            <Route
              path="product-video/:id"
              element={<ProductDetailPageVideo />}
            />
            <Route path="product-3d/:id" element={<ProductDetailPage3D />} />
            <Route
              path="product-together/:id"
              element={<ProductDetailPageTogether />}
            />
            <Route
              path="product-countdown-timer/:id"
              element={<ProductDetailPageCountTimer />}
            />
            <Route
              path="product-volume-discount/:id"
              element={<ProductDetailPageVolumeDiscount />}
            />
            <Route
              path="product-volume-discount-thumbnail/:id"
              element={<ProductDetailPageVolumeDiscountThumbnail />}
            />
            <Route
              path="product-swatch-dropdown/:id"
              element={<ProductDetailPageSwatchDropdown />}
            />
            <Route
              path="product-swatch-dropdown-color/:id"
              element={<ProductDetailPageSwatchDropdownColor />}
            />
            <Route
              path="product-swatch-image/:id"
              element={<ProductDetailPageSwatchImage />}
            />
            <Route
              path="product-swatch-image-square/:id"
              element={<ProductDetailPageSwatchImageSquare />}
            />
            <Route
              path="product-pickup-available/:id"
              element={<ProductDetailPagePickupAvaailable />}
            />
            <Route
              path="product-description-vertical/:id"
              element={<ProductDetailPageDescriptionVertical />}
            />
            <Route
              path="product-description-tab/:id"
              element={<ProductDetailPageDescriptionTab />}
            />
            <Route
              path="product-description-accordions/:id"
              element={<ProductDetailPageDecscriptionAccordion />}
            />
            <Route
              path="product-description-side-accordions/:id"
              element={<ProductDetailPageSideAccordion />}
            />
            <Route
              path="product-affiliate/:id"
              element={<ProductDetailPageAffiliate />}
            />
            <Route
              path="product-out-of-stock/:id"
              element={<ProductDetailPageOutOfStock />}
            />

            <Route
              path="product-buyx-gety/:id"
              element={<ProductDetailPageBuyxGety />}
            />
            <Route
              path="product-group/:id"
              element={<ProductDetailPageGroup />}
            />

            <Route path="about-us" element={<AboutUsPage />} />
            <Route path="contact-us" element={<ContactusPage />} />
            <Route path="store-location" element={<StoreLocationPage />} />

            <Route path="faq" element={<FaqPage />} />
            <Route path="cart-empty" element={<CartEmptyPage />} />
            <Route path="cart-drawer-v2" element={<CartDrawerPage2 />} />
            <Route path="view-cart" element={<ViewCartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="checkout/thank-you" element={<ThankYouPage />} />
            <Route path="compare" element={<ComparePage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />

            <Route path="before-you-leave" element={<BeforeYouLeavePage />} />
            <Route path="cookies" element={<CookiesPage />} />

            <Route path="404" element={<NotFoundPage />} />
            <Route path="coming-soon" element={<CommingSoonPage />} />
            <Route path="blog-list-01" element={<BlogListPage1 />} />
            <Route path="blog-list-02" element={<BlogListPage2 />} />
            <Route path="blog-grid-01" element={<BlogGridPage1 />} />
            <Route path="blog-grid-02" element={<BlogGridPage2 />} />
            <Route path="blog-single/:id" element={<BlogDetailsPage1 />} />

            <Route path="account-orders" element={<AccountOrderPage />} />
            <Route path="account-orders/:id" element={<AccountOrderDetailPage />} />
            <Route path="wish-list" element={<WishlistPage />} />
            <Route path="account-addresses" element={<AccountAddressPage />} />
            <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AppErrorBoundary>
        <DemoModal />
        <CartComponent />
        <Compare />
        <Login />
        <Register />
        <UserMenu />
        <MobileMenu />
        <Quickview />
        <SearchModal />
        <Toolbar />
        <SizeGuide />
        <QuestionModal />
        <ShareModal />
        <DbSidebar />
      </Context>
      <ScrollTop />
      <ScrollTopBehaviour />
    </>
  );
}

export default App;
