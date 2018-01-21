import Nav from './components/nav';
import Form from './components/form';
import Modal from './components/modal';
import Sticky from './components/sticky';

import HomeCarousel from './components/homeCarousel';
import HomeHero from './components/homeHero';
import SignForm from './components/signForm';
import PetitionComments from './components/petitionComments';
import DonateReceipt from './components/donateReceipt';
import DonateShortForm from './components/donateShortForm';
import DonateFullForm from './components/donateFullForm';
import DonateBoxedForm from './components/donateBoxedForm';
import PriceSelectGroup from './components/priceSelectGroup';

$(document).ready(function () {
  Nav.init();
  HomeCarousel.init();
  HomeHero.init();
  Form.init();
  Modal.init();
  Sticky.init();

  SignForm.init();
  PetitionComments.init();
  DonateReceipt.init();
  DonateShortForm.init();
  DonateFullForm.init();
  DonateBoxedForm.init();
  PriceSelectGroup.init();
});
