var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }

var options = {
    "swaggerDoc": {
        "openapi": "3.0.0",
        "info": {
            "title": "Social Networking",
            "description": "",
            "version": "v1",
            "contact": {
                "name": "",
                "url": "",
                "email": ""
            }
        },
        "tags": [],
        "servers": [
            {
              "url": "https://social-networking-v1.herokuapp.com/api/v1"
            },
            {
                "url": "http://localhost:5000/api/v1"
            }
        ],
        "components": {
            "securitySchemes": {
                "bearer": {
                  "scheme": "bearer",
                  "bearerFormat": "JWT",
                  "type": "http"
                }
            },
            "schemas": {
                "AuthLogin": {
                    "type": "object",
                    "properties": {
                        "email": {
                        "type": "string"
                        },
                        "password": {
                        "type": "string"
                        }
                    },
                    "required": [
                        "email",
                        "password"
                    ]
                },
                "AuthRegister": {
                    "type": "object",
                    "properties": {
                        "email": {
                        "type": "string"
                        },
                        "password": {
                        "type": "string"
                        },
                        "firstName": {
                            "type": "string"
                        },
                        "lastName": {
                            "type": "string"
                        },
                        "phoneNumber":{
                          "type": "string"
                        },
                        "gender": {
                          "type": "string"
                        }
                    },
                    "required": [
                        "email",
                        "password",
                        "firstName",
                        "lastName",
                        "phoneNumber",
                        "gender"
                    ]
                },
                "User": {
                    "type": "object",
                    "properties": {
                        "_id": {
                            "type": "string"
                        },
                        "email": {
                            "type": "string"
                        },
                        "firstName": {
                            "type": "string"
                        },
                        "lastName": {
                            "type": "string"
                        },
                        "phoneNumber":{
                          "type": "string"
                        },
                        "gender": {
                          "type": "string"
                        },
                        "avatar": {
                          "type": "string"
                        }
                    },
                    "required": [
                        "_id",
                        "email",
                        "firstName",
                        "lastName",
                        "phoneNumber",
                        "gender",
                    ]
                },
                "ProfileUpdate": {
                  "type": "object",
                  "properties": {
                  
                    "firstName": {
                        "type": "string"
                    },
                    "lastName": {
                        "type": "string"
                    },
                    "phoneNumber":{
                      "type": "string"
                    },
                    "gender": {
                      "type": "string"
                    },
                    "avatar": {
                      "type": "string"
                    }
                    
                  }
                },
                "LoginResponse": {
                    "type": "object",
                    "properties": {
                        "user": {
                        "$ref": "#/components/schemas/User"
                        },
                        "token": {
                        "type": "string"
                        }
                    },
                    "required": [
                        "user",
                        "token"
                    ]
                }
            }
        },
        "paths": {
            "/auth/login": {
                "post": {
                    "operationId": "Authentication_login",
                    "parameters": [],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/AuthLogin"
                                }
                            }
                        }
                    },
                    "responses": {
                      "200": {
                        "description": "",
                        "content": {
                          "application/json": {
                            "schema": {
                              "$ref": "#/components/schemas/LoginResponse"
                            }
                          }
                        }
                      },
                      "401": {
                        "description": "Thông tin xác thực không chính xác (thông tin đăng nhập hoặc JWT)."
                      },
                      "500": {
                        "description": "Lỗi hệ thống."
                      }
                    },
                    "tags": [
                      "Auth"
                    ]
                }
            },
            "/auth/register": {
                "post": {
                    "operationId": "Authentication_register",
                    "parameters": [],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/AuthRegister"
                                }
                            }
                        }
                    },
                    "responses": {
                      "201": {
                        "description": "",
                        "content": {
                          "application/json": {
                            "schema": {
                              "$ref": "#/components/schemas/User"
                            }
                          }
                        }
                      },
                      "400": {
                        "description": "Lỗi thông tin."
                      },
                      "500": {
                        "description": "Lỗi hệ thống."
                      }
                    },
                    "tags": [
                      "Auth"
                    ]
                }
            },
            "/user/profile":{
              "get":{
                "operationId": "User_profile",
                "parameters": [],
                "responses": {
                  "200":{
                    "description": "",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/User"
                        }
                      }
                    }
                  },
                  "401": {
                    "description": "Thông tin xác thực không chính xác (thông tin đăng nhập hoặc JWT). <a href=/error-example/unauthorized target=_blank style=\"text-decoration:none\"> Ví dụ</a>"
                  },
                  "403": {
                    "description": "Người dùng không được cấp quyền truy cập nguồn nội dung. <a href=/error-example/forbidden target=_blank style=\"text-decoration:none\"> Ví dụ</a>"
                  },
                  "500": {
                    "description": "Lỗi hệ thống. <a href=/error-example/internal-server-error target=_blank style=\"text-decoration:none\"> Ví dụ</a>"
                  }
                },
                "tags": [
                  "Users"
                ],
                "security":[
                  {
                    "bearer": []
                  }
                ]
              }
            },
            "/user/update/profile":{
              "put":{
                "operationId": "User_profile",
                "parameters": [],
                "requestBody":{
                  "required": true,
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/ProfileUpdate"
                      }
                    }
                  }
                },
                "responses": {
                  "200":{
                    "description": "",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/User"
                        }
                      }
                    }
                  },
                  "401": {
                    "description": "Thông tin xác thực không chính xác (thông tin đăng nhập hoặc JWT). <a href=/error-example/unauthorized target=_blank style=\"text-decoration:none\"> Ví dụ</a>"
                  },
                  "403": {
                    "description": "Người dùng không được cấp quyền truy cập nguồn nội dung. <a href=/error-example/forbidden target=_blank style=\"text-decoration:none\"> Ví dụ</a>"
                  },
                  "500": {
                    "description": "Lỗi hệ thống. <a href=/error-example/internal-server-error target=_blank style=\"text-decoration:none\"> Ví dụ</a>"
                  }
                },
                "tags": [
                  "Users"
                ],
                "security":[
                  {
                    "bearer": []
                  }
                ]
              }
            }
        }
    },
    "customOptions": {
        "defaultModelsExpandDepth": -1,
        "displayRequestDuration": true,
        "docExpansion": "none",
        "filter": true,
        "operationsSorter": (a, b) => {
                        const order = {
                            get: "0",
                            post: "1",
                            put: "2",
                            delete: "3",
                        };
                        return (order[a._root.entries[1][1]].localeCompare(order[b._root.entries[1][1]]) ||
                            a._root.entries[0][1].localeCompare(b._root.entries[0][1]));
                    }
    },
    "swaggerUrl": {}
}