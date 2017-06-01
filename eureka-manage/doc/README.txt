#建立高可用的注册中心
1、配置两个，并指定不同的端口，配置好hostname方便启动的时候指定
application-eureka.properties
2、命令行运行
java -jar eureka-manage-0.0.1-SNAPSHOT.jar --spring.profiles.active=eureka指定节点