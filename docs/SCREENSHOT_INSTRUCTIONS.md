## URGENT: How to Add Your Project Screenshots

Your portfolio HTML is ready, but you need to manually save the screenshot images you shared.

### Step-by-Step Instructions:

1. **Open the screenshots you shared earlier**
2. **Right-click on each image and "Save As" with these exact names:**

   📸 **First Screenshot (Portfolio)** → Save as: `portfolio-screenshot.jpg`
   📸 **Second Screenshot (Academic System)** → Save as: `academic-system-screenshot.jpg`  
   📸 **Third Screenshot (Movie Site)** → Save as: `movie-site-screenshot.jpg`

3. **Save all images to this exact location:**
   ```
   c:\Users\DELL\OneDrive\Desktop\Profile\
   ```

4. **After saving, refresh your portfolio website**

### Quick Check:
Run this command to verify the images are saved:
```powershell
Get-ChildItem *screenshot*.jpg
```

### Alternative Method:
If you have the images elsewhere, copy them and rename:
```powershell
# If you have the images in Downloads or elsewhere, copy and rename them
Copy-Item "path\to\your\image1.jpg" "portfolio-screenshot.jpg"
Copy-Item "path\to\your\image2.jpg" "academic-system-screenshot.jpg"
Copy-Item "path\to\your\image3.jpg" "movie-site-screenshot.jpg"
```

Once you save these 3 images with the correct names, your portfolio will show your real project screenshots! 🚀