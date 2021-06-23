import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '', // put your clarifai api here
});

const ApiCall = (req, res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
}

export default ApiCall;
