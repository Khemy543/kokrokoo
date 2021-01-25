import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Transactions from "views/Transactions/Transactions.js";
import ViewRateCard from "views/RateCards/ViewRateCards";
import MySubscription from "views/Subscriptions/MySubscriptions.js";
import PublishedCompanies from "./views/RateCards/PublishedCompanies.js";
import RateCards from "./views/RateCards/RateCards.js";
import RateCardDetails from "./views/RateCards/RateCardDetails.js";
import CreateSubscription from "views/Subscriptions/CreateSubscription.js";
import CreateRateCards from "views/Subscriptions/CreateSubRateCardDetails.js";
import UploadFile from "views/Subscriptions/UploadMediaFile.js";
import CreatePublishedCompanies from "views/Subscriptions/CreatePublishedCompanies.js";
import Calender from "views/Subscriptions/calender.js";
import PrintCalender from "views/Subscriptions/PrintCalendar";
import Cart from "views/Cart";
import Invoice from "views/Payment/Invoice.js";
import EditSubscription from "views/Subscriptions/EditSubcription.js";
import EditPrintSubscription from "views/Subscriptions/EditPrintSubscription.js";
import VolumeDiscount from "views/VolumeDiscount/VolumeDiscount.js";
import ChangePassword from "views/ChangePassword/ChangePassword.js";
import AccountDetails from "views/Payment/AccountDetails.js";
import UserDetails from "views/Payment/UserDetails.js";
import PaymentVerification from "views/Payment/PaymentVerification.js";
import SelectMedia from "views/VolumeDiscount/SelectMedia.js";
import EditCampaign from "views/Subscriptions/EditCampaign/EditCampaign.js";
import SelectEditType from "views/Subscriptions/EditCampaign/SelectEditType.js";
import ChangeAdFile from "views/Subscriptions/EditCampaign/ChangeAdFile.js";
import CreateUsers from "views/Users/CreateUser.js";
import GetUsers from "views/Users/FetchUsers.js";
import SelectMediaType from "views/VolumeDiscount/SelectMediaType.js";
import TransactionDetails from "views/Transactions/TransactionDetails.js";
import TrackCampaign from "views/Subscriptions/LiveCampaigns/TrackCampaign.js";
import PrintRateCardDetails from "views/RateCards/PrintRateCardDetails.js";
import CompletedCampaigns from "views/Subscriptions/CompletedCampaigns.js";
import EditPrintCalender from "views/Subscriptions/EditCampaign/EditPrintCampaign.js";
import SearchResults from "views/Search/SearchResults.js";
import SubDetails from "views/Subscriptions/SubscriptionDetails.js";
import SubCompletedDetails from "views/Subscriptions/CompletedCampaignDetails.js";
import RejectedCampaigns from "views/Subscriptions/RejectedCampaigns.js";
import RejectedCampaignDetails from "views/Subscriptions/RejectedCampaignDetails.js";
import SelectMediaTypeRes from "views/Resubscribe/SelectMediaTypeRes.js";
import SelectCompanyRes from "views/Resubscribe/SelectCompanyRes.js";
import SelectRateCardRes from "views/Resubscribe/SelectRateCardRes.js";
import UploadFileRes from "views/Resubscribe/UploadAdRes.js";
import VideoResubscribeCalender from "views/Resubscribe/VideoResubscribe.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    header:"dashboard",
    component: Index,
    layout: "/client"
  },
  {
    path: "/view-ratecards",
    name: "View RateCards",
    header:"rate",
    component: ViewRateCard,
    layout: "/client"
  },
  {
    path: "/view-ratecards-details-print",
    name: "View RateCards",
    header:"rate",
    invisible:true,
    component: PrintRateCardDetails,
    layout: "/client"
  },
  {
    
    path: "/create-subscription",
    name: "Create Ad Campaign",
    header:"subscriptions",
    component: CreateSubscription,
    layout: "/client"
  },
  {
    
    path: "/edit-campaign",
    name: "Edit Campaign",
    invisible:true,
    header:"subscriptions",
    component: EditSubscription,
    layout: "/client"
  },
  {
    
    path: "/edit-print-campaign",
    name: "Edit Campaign",
    invisible:true,
    header:"subscriptions",
    component: EditPrintCalender,
    layout: "/client"
  },
  {
    
    path: "/select-edit-type",
    name: "Edit Campaign",
    invisible:true,
    header:"subscriptions",
    component: SelectEditType,
    layout: "/client"
  },
  {
    
    path: "/edit-adcampaign",
    name: "Edit Campaign",
    invisible:true,
    header:"subscriptions",
    component: EditCampaign,
    layout: "/client"
  },
  {
    
    path: "/change-adfile",
    name: "Edit Campaign",
    invisible:true,
    header:"subscriptions",
    component: ChangeAdFile,
    layout: "/client"
  },
  {
    
    path: "/edit-printcampaign",
    name: "Edit Campaign",
    invisible:true,
    header:"subscriptions",
    component: EditPrintSubscription,
    layout: "/client"
  },
  {
    
    path: "/my-subscription",
    name: "Manage Ad Campaign",
    header:"subscriptions",
    component: MySubscription,
    layout: "/client"
  },
  {
    
    path: "/completed-campaigns",
    name: "Completed Campaigns",
    header:"subscriptions",
    component: CompletedCampaigns,
    layout: "/client"
  },
  {
    
    path: "/rejected-campaigns",
    name: "Rejected Campaigns",
    header:"subscriptions",
    component: RejectedCampaigns,
    layout: "/client"
  },
  
  {
    
    path: "/live-campaigns",
    name: "Ad Schedule Tracker",
    header:"tracker",
    component: TrackCampaign,
    layout: "/client"
  },
  {
    path: "/transactions",
    name: "Transactions",
    header:"transactions",
    component: Transactions,
    layout: "/client"
  }, 
  {
    path: "/transactions-details",
    name: "Transactions",
    header:"transactions",
    invisible:true,
    component: TransactionDetails,
    layout: "/client"
  }, 
  {
    path: "/cart",
    name: "Your Cart",
    header:"cart",
    component: Cart,
    layout: "/client"
  },
  {
    path: "/volume-discount",
    name: "Discount",
    header:"discount",
    component: VolumeDiscount,
    invisible:true,
    layout: "/client"
  },
  {
    path: "/select-mediahouse",
    name: "Select Media House",
    header:"discount",
    invisible:true,
    component: SelectMedia,
    layout: "/client"
  },
  {
    path: "/select-media-type",
    name: "View Discounts",
    header:"discount",
    component: SelectMediaType,
    layout: "/client"
  },
  {
    path: "/create-user",
    name: "Create User",
    header:"users",
    component: CreateUsers,
    layout: "/client"
  },
  {
    path: "/all-users",
    name: "All Users",
    header:"users",
    component: GetUsers,
    layout: "/client"
  },
  {
    path: "/change-password",
    name: "Change Password",
    header:"settings",
    component: ChangePassword,
    layout: "/client"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    header:"settings",
    component: Profile,
    layout: "/client"
  },
  {
    path: "/published-companies",
    name: "Media Houses",
    invisible:true,
    component: PublishedCompanies,
    layout: "/client"
  },
  {
    path: "/rate-cards",
    name: "Rate cards",
    invisible:true,
    component: RateCards,
    layout: "/client"
  },
  {
    path: "/create-sub-rate-cards",
    name: "Rate cards",
    invisible:true,
    component: CreateRateCards,
    layout: "/client"
  },
  {
    path: "/rate-card-details",
    name: "Ratecard details",
    invisible:true,
    component: RateCardDetails,
    layout: "/client"
  },
  {
    path: "/upload-file",
    name: "File Upload",
    invisible:true,
    component: UploadFile,
    layout: "/client"
  },
  {
    path: "/published-companies-create",
    name: "Media Houses",
    invisible:true,
    component: CreatePublishedCompanies,
    layout: "/client"
  },
  {
    path: "/calendar",
    name:"Calendar",
    invisible:true,
    component: Calender,
    layout: "/client"
  },
  {
    path: "/print-calendar",
    name: "Calendar",
    invisible:true,
    component: PrintCalender,
    layout: "/client"
  },
  {
    path: "/subscription-invoice",
    name: "Invoice",
    invisible:true,
    component: Invoice,
    layout: "/client"
  },
  {
    path: "/payment/details",
    name: "Payment",
    invisible:true,
    component: UserDetails,
    layout: "/client"
  },
  {
    path: "/payment/account-information",
    name: "Payment",
    invisible:true,
    component: AccountDetails,
    layout: "/client"
  },
  {
    path: "/payment/verify-payment",
    name: "Payment",
    invisible:true,
    component: PaymentVerification,
    layout: "/client"
  },
  {
    path: "/search-results",
    name: "Search Results",
    invisible:true,
    component: SearchResults,
    layout: "/client"
  },
  {
    path: "/campaign-details",
    name: "Campaign",
    invisible:true,
    component: SubDetails,
    layout: "/client"
  },
  {
    path: "/completed-details",
    name: "Campaign",
    invisible:true,
    component: SubCompletedDetails,
    layout: "/client"
  },
  {
    path: "/rejected-details",
    name: "Campaign",
    invisible:true,
    component: RejectedCampaignDetails,
    layout: "/client"
  },
  {
    path: "/resubscribe/media-type",
    name: "Resubscribe",
    invisible:true,
    component: SelectMediaTypeRes,
    layout: "/client"
  },
  {
    path: "/resubscribe/media-house",
    name: "Resubscribe",
    invisible:true,
    component: SelectCompanyRes,
    layout: "/client"
  },
  {
    path: "/resubscribe/rate-card",
    name: "Resubscribe",
    invisible:true,
    component: SelectRateCardRes,
    layout: "/client"
  },
  {
    path: "/resubscribe/upload-file",
    name: "Resubscribe",
    invisible:true,
    component: UploadFileRes,
    layout: "/client"
  },
  {
    path: "/resubscribe/calendar",
    name: "Resubscribe",
    invisible:true,
    component: VideoResubscribeCalender,
    layout: "/client"
  },
  
];
export default routes;
