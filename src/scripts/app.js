import Nav from './components/nav';
import Form from './components/Form';
import Modal from './components/Modal';

import HomeCarousel from './components/homeCarousel';
import SignForm from './components/signForm';
import PetitionComments from './components/petitionComments';

$(document).ready(function () {
  Nav.init();
  HomeCarousel.init();
  Form.init();
  Modal.init();
  SignForm.init();
  PetitionComments.init();
});
