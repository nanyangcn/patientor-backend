import express from 'express';
import cors from 'cors';

import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use(express.static('build'));

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.use('/api/diagnosis', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
