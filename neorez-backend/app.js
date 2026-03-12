const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const connectDB = require('./dataBase/db')
const UserRoute = require('./routes/UserRoute')
const UserBasicInfo = require('./routes/UserBasicInfo')
const ResumeRoute = require('./routes/UserResumeRoute')
const CoverLetterRoute = require('./routes/CoverLetterRoute')
const PricingPlanRoute = require('./routes/PricingPlansRoute')
const JobApplicationRoute = require('./routes/jobApplicationRoute')
const AdminRoute = require('./routes/AdminRoutes')
const stripeRoutes = require('./routes/StripeRoute')
const fileUpload = require('express-fileupload')

app.use(cors())
app.use(fileUpload());
// app.use(express.json())
app.use(express.json({ limit: '50mb' }));
// app.use(
//     express.urlencoded({
//         extended: false,
//     })
// );
const PORT = 3000

app.use('/user', UserRoute)
app.use('/userInfo', UserBasicInfo)
app.use('/resume', ResumeRoute)
app.use('/cover', CoverLetterRoute)
app.use('/pricing-plan', PricingPlanRoute)
app.use('/job-app', JobApplicationRoute)
app.use('/admin-route', AdminRoute)

// Use the Stripe routes
app.use('/StripePayment',stripeRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("connnect to DB")
        console.log("Server is running " + PORT)
    })
})