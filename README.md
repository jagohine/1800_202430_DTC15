# RealRoom Application

## 1. Project Description

RealRoom is a mobile-first web application developed to help tenants, landlords, building managers, etc. inspect properties they cannot directly access by connecting them with verified third-party inspectors to make sure the properties meet their expectations. In RealRoom, you can create a request to inspect a room of interest with a customized request form, receive responses from the inspector, and leave a review on a finished inspection.

## 2. Contributors

- Jago  Hine: 
- Zoey Jiang: 
- Khai Phan: an ex-business school student who loves to explore the world of programming and building meaningful applications.

## 3. Technologies and Resources Used

List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.

- HTML, CSS, JavaScript
- Bootstrap 5.0 (Frontend library)
- Firebase 8.0 (BAAS - Backend as a Service)

## 4. Complete usage

Here are the key features of our app:

- Login or sign up for a new account using your email
- Start a new post for an inspection request by clicking the "plus" button on the top of the homepage or at the bottom nav bar.
- In the form, select the areas of the room that you want the inspector to inspect and response with details.
- Once a post is created and waiting to be inspected, you can view the post in the Ongoing Inspections section on the homepage.
- Click the "Details" button on each post to view the details.
- After a request has been completed by an inspector, the post will be moved to Past Inspections section on the homepage.
- Click on the "Details" button on the inspection to view the responses from the inspector.
- For each completed inspection, you can rate the inpsector's service by clicking the "Leave a review" button inside each finished inspection and fill a form.
- To archive/unarchive a completed inspection, click "Archive" button inside each inspection post.
- To view archived posts, click the "Archive" button on the top nav bar or in the hamburger menu icon.

## 5. Known Bugs and Limitations

Here are some known bugs:

- Completion Date label is duplicated.
- Notifications page in construction, not clickable.

## 6. Features for Future

What we'd like to build in the future:

- Notifications page to alert the user whenever there's a new update in an ongoing inspection.
- A complete user guide and Frequently Asked Questions page.
- A search bar where users can search for a specific inspection or a keyword that redirects them to the correct help document.

## 7. Contents of Folder

Content of the project folder:

Top level files:

```

├── .gitignore
├── about.html
├── archive.html
├── archived.html
├── home.html
├── index.html
├── inspection_details_template.html
├── inspection_details.html
├── inspections_request_example.html              
├── login.html
├── main.html
├── new_inspection.html
├── review.html
├── support.html
├── thanks.html              
└── README.md

It has the following subfolders and files:
├── .git  
├── div_components
    /bottom_menu.html
    /inspection_requests.html
    /ongoing_inspections.html
    /past_inspections.html            
├── images    
    ├── assets
        /add_circle.svg
        /add_icon.png
        /archive_24dp.svg
        /bell.svg
        /Daco_5130138.png
        /home_24dp.svg
        /home.svg
        /message-circle.svg
        /notifications_24dp.svg
        /user-circle.svg             
    ├── example_images
        /apartment1.jpg  
        /apartment2.webp
        /apartment3.jpeg
        /apartment4.jpeg
        /apartment5.jpg
        /apartment6.jpg
        /apartment7.jpg
        /apartment8.jpg
        /apartment9.jpg
        /apartment10.jpg
        /girl.png
        /girl2.png
        /man.png
    ├── icons
        /home.svg
        /messages.svg
        /notifications.svg
    ├── logos
        /logo-no-background.png
    ├── pictures
        /about_us.png
    /archive.svg
    /colorpalette.jpg
    /interior_inspection.png
    /logo.jpg
    /NV01.jpg
    /realroom-high-resolution-logo.svg
    /RR_background.jpg    
├── scripts                  
    /archive.js
    /archived.js
    /authentication.js
    /firebaseAPI_RealRoom.js
    /home.js
    /inspection_details_template_example.js    
    /inspection_details_template.js     
    /inspection_details.js   
    /main.js
    /menu.js
    /new_inspection.js
    /ongoing_inspection.js
    /rate.js
    /review.js
    /script.js
    /skeleton.js     
├── styles                   
    /homepage.css
    /new_inspections.css
    /style.css
├── text
    /add_inspection_bar.html
    /bottom_nav.html
    /guide.html
    /top_nav_after_login.html
    /top_nav_before_login.html          

```
