import Nav from './components/nav';
import Form from './components/form';
import Modal from './components/modal';

import HomeCarousel from './components/homeCarousel';
import SignForm from './components/signForm';
import PetitionComments from './components/petitionComments';
import DonateReceipt from './components/donateReceipt';
import DonateShortForm from './components/donateShortForm';
import DonateFullForm from './components/donateFullForm';
import PriceSelectGroup from './components/priceSelectGroup';

$(document).ready(function () {
  Nav.init();
  HomeCarousel.init();
  Form.init();
  Modal.init();
  SignForm.init();
  PetitionComments.init();
  DonateReceipt.init();
  DonateShortForm.init();
  PriceSelectGroup.init();
});
