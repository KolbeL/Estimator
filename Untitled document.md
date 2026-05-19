## **System Specification: Quick Landscaping Estimator App**

This document outlines the technical and functional requirements for the **Quick Landscaping Estimator**, a professional utility designed for landscaping contractors to generate dynamic, accurate project proposals and export them as formatted PDF documents.

---

### **1\. System Scope & Functional Requirements**

#### **1.1 User Inputs & Data Modeling**

The application must capture the following primary data points:

* **Customer Name:** Required free-text field.  
* **Customer Address:** Multi-line text or Google Maps Autocomplete integration.  
* **Date of Estimate:** Date picker; defaults to current date but remains editable.  
* **Project Short Name:** Concise identifier (e.g., "Main St. Sod Install").  
* **Scope of Work (Dynamic List):** An expandable list where users can define:  
  * **Identifier/Title:** (e.g., "Phase 1: Grading")  
  * **Description:** Technical details of the task.  
  * *Controls:* "+" (Add) and "Trash" (Remove) buttons for array management.  
* **Estimated Timing:**  
  * **Start Date:** Date picker.  
  * **Completion Date:** Date picker.

#### **1.2 Project Costs Breakdown**

The application calculates the final quote based on four distinct sub-categories:

1. **Materials Costs:** Dynamic array (Item Name, Quantity, Unit Price, and Auto-calculated Line Total).  
2. **Machinery Rentals (Optional):** Fields for equipment name, duration, and rates. **Note:** If this section is empty, it must be suppressed from the final PDF.  
3. **Labor (Time-Tracked):** Estimated duration in **Days**.  
   * *Validation:* Inputs must be restricted to increments of **0.5 days** (e.g., 1.0, 1.5, 2.0).  
4. **Miscellaneous:** Custom entries for flat-fee costs (e.g., permits, dumping fees).

#### **1.3 Formula Logic**

The underlying engine aggregates all inputs to produce the final client price:

*Total*\=∑(Material Cost)+∑(Machinery Cost)+(Labor Days×Daily Rate)+∑(Misc Cost)

---

### **2\. Global Configurations (Persistence Layer)**

To ensure consistency, the app features a **Global Settings Panel**. Data saved here persists across all new estimates.

* **Logo:** An image loader that takes in the business logo. This logo is placed on the top right of the first page of the PDF  
* **Terms & Conditions Boilerplate:** A rich-text area for legal disclaimers, payment schedules, and warranties.  
* **Company Contact Information:** Fields for Company Name, Phone, Email, Website, and License Numbers.

---

### **3\. UI Mockups & Interface Logic**

#### **UI Screen 1: Input Matrix Dashboard**

* **Client Header:** Fields for Name, Address, and Date.  
* **Scope Grid:** A list-view of "Things" to be done.  
* **Financial Modules:** Tables for Materials and Machinery with inline "Add Row" functionality.  
* **Labor Slider/Input:** A stepper-style input for days (0.5 increments).

#### **UI Screen 2: Global Configuration Panel**

* Accessed via a sidebar link "Template Settings."  
* Provides the "Save Default Settings" button which commits data to localStorage or the database.

---

### **4\. Technical Architecture & Document Generation**

#### **4.1 Data Schema (JSON)**

Before rendering, data is structured as follows:

JSON

{  
  "customerName": "John Doe",  
  "estimateDate": "2026-05-18",  
  "scopeOfWork": \[  
    {"title": "Excavation", "description": "Remove existing turf and grade soil"}  
  \],  
  "costs": {  
    "materials": \[{"name": "Sod", "qty": 1200, "unitPrice": 0.45}\],  
    "laborDays": 3.5,  
    "laborDailyRate": 400.00  
  }  
}

#### **4.2 PDF Rendering Rules**

* **Page Breaks:** Utilize CSS page-break-inside: avoid; to ensure tables aren't split awkwardly.  
* **Dynamic Visibility:** If machinery or misc arrays are empty, the corresponding headers must not appear in the PDF.  
* **Header/Footer Bindings:** Company contact info and T\&Cs must appear at the base of the document.