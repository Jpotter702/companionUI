Title: API Authorization Documentation | FedEx Developer Portal

URL Source: https://developer.fedex.com/api/en-us/catalog/authorization/v1/docs.html

Markdown Content:
The FedEx APIs support the OAuth 2.0 (bearer token) authentication method to authorize your application API requests with FedEx resources. This OAuth access token needs to be regenerated after every 60 minutes and provided with each API transaction to authenticate and authorize your access to the FedEx resources.

This API allows you to authorize the API requests and it is required to authenticate the FedEx resources. The following section describes the prerequisites for the API:

While registering to FedEx Developer portal, FedEx provides a combination of Client ID (API Key) and Client Secret (Secret Key) to authenticate API requests for your project. Each project under your organization is associated with a combination of Client ID and Client Secret, called as API credentials.

_Note: Customers (Internal, Compatible, Proprietary Parent Child, and Integrators) can contact FedEx representative to obtain API and Secret Keys._

To provide an extra layer of security, the FedEx® customers (Internal, Compatible, Proprietary Parent Child, and Integrators) can send Child Key (Customer Secret) and Child Secret (Customer password) in addition to the API Key and Secret Key to create an OAuth token. This token is used in every API request for authentication.

You can recreate the forgotten Secret Key from the Projects page on the FedEx Developer Portal.

_Note: Creation of new keys will result into code change in your application._

Important information in this document:

*   Client Key as API Key
*   Client Secret as Secret Key
*   Child Key as Customer Key
*   Child Secret as Customer Password

API credentials serve the following purposes:

*   They identify the project making a call to the APIs.
*   They authorize access to the APIs that are enabled under your project.

Credentials are created based on inputs in the FedEx Developer Portal:

*   **Client ID** – API Key (Client ID) gets created when a project is created on FedEx Developer portal. You can also view the API Key associated with the project on the **Project Overview** page.
*   **Client Secret** – You will see the Secret Key (Client Secret) on the confirmation page once a project is created on the FedEx Developer portal. If needed, the Secret Key can also be regenerated, on the **Project Overview** page.

_Note: FedEx® customers (Internal, Compatible, Proprietary Parent Child, and Integrators) need to send Child Key (Customer Secret) and Child Secret (Customer password) in addition with API Key and Secret Key for creating OAuth token. Refer Credential Registration API for how to get Child Key and Child Secret._

**API Authorization**

Once you have secured the API credentials on FedEx Developer portal, the OAuth endpoint is used to get an access token which is used as credentials with each API transaction.

These are the required inputs associated with the OAuth request:

*   grant\_type – Type of customer. (Valid values: client\_credentials, csp\_credentials, client\_pc\_credentials)
*   client\_id – Refers to the Project API Key.
*   client\_secret – Refers to the Project API Secret Key.

For FedEx® Internal, Compatible, Proprietary Parent Child, and Integrator customers, need to send the below additional inputs:

*   child\_id – Customer Key returned through Credential Registration API request.
*   child\_secret – Customer password returned through Credential Registration API request

The result of this request should return below:

*   access\_token – The encrypted OAuth token that needs to be used in the API transaction.
*   token\_type – Type of token. In this case, it is _bearer authentication_.
*   expires\_in – Token expiration time in milliseconds. One hour is the standard Token expiration time.
*   Scope – Scope of authorization provided to the consumer.

**Examples**

Request:

_POST /oauth/token HTTP/1.1  
grant\_type= client\_credentials&client\_id=your client ID&client\_secret=Your secret_

Response:

_{ ″access\_token″: ″eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX……..″,  
″token\_type″: ″bearer″,  
″expires\_in″: 3600,  
″scope″: ″CXS″  
}_

Request For FedEx® Internal, Compatible, and Integrator customers:

_POST /oauth/token HTTP/1.1  
grant\_type= csp\_credentials&client\_id=Client ID&client\_secret= Client secret&child\_key=Child key&child\_secret=Child Secret_

Response:

_{ ″access\_token″: ″eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX……..″,  
″token\_type″: ″bearer″,  
″expires\_in″: 3600,  
″scope″: ″CXS″  
}_

Request For FedEx® Proprietary Parent Child customers:

_POST /oauth/token HTTP/1.1  
grant\_type= client\_pc\_credentials&client\_id=Client ID&client\_secret= Client secret&child\_key=Child key&child\_secret=Child Secret_

Response:

_{ ″access\_token″: ″eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX……..″,  
″token\_type″: ″bearer″,  
″expires\_in″: 3600,  
″scope″: ″CXS″  
}_

_Note: The access token expires in an hour, it can be regenerated by using a POST request to the oauth/token endpoint._


<!--stackedit_data:
eyJoaXN0b3J5IjpbMTg5Nzg1MjE1NV19
-->