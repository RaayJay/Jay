<template>
    <div>
        <!-- 按钮 -->
        <el-button size="small" type="success" @click="toAddHandler">添加</el-button>
        <el-button size="small" type="danger">批量删除</el-button>
        <!-- /按钮 -->
        <!-- 表格 -->
        <el-table :data="products">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="产品名称"></el-table-column>
            <el-table-column prop="description" label="产品描述"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="categoryId" label="所属栏目"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="slot">
                    <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                    <a href="" @click.prevent="toUpdateHandler">修改</a>
                    <a href="" @click.prevent="toDetailsHandler">详情</a>
                </template>
            </el-table-column>
        </el-table>
        <!-- /表格 -->
        <!-- 分页 -->
        <el-pagination layout="prev, pager, next" :total="50">
        </el-pagination>
        <!-- /分页 -->
        <!-- 模态框 -->
        <el-dialog :title="title" :visible.sync="visible" width="60%">
            测试:{{form}}
            <el-form :model="form" label-width="80px">
                <el-form-item label="产品名称">
                    <el-input v-model="form.name"/>
                </el-form-item>
                <el-form-item label="产品描述">
                    <el-input v-model="form.description"/>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="form.price"/>
                </el-form-item>
                <el-form-item label="产品状态">
                    <el-input v-model="form.status"/>
                </el-form-item>
                <el-form-item label="所属栏目">
                    <el-select v-model="form.status" pleaceholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.parentId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="closeModalHandler">取 消</el-button>
                <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
            </span>
        </el-dialog>
        <!-- /模态框 -->
    </div>
</template>

<script>
import request from '@/utils/request'
import querystring from 'querystring'
export default {
    data(){
        return{
            options:{},
            select:{},
            key:{},
            label:{},
            value:{},
            title:"录入产品信息",
            visible:false,
            products:[],
            form:{
                type:"product"
            }
        }
    },
    created(){
        //在页面加载出来的时候加载数据
        this.loadData();
    },
    methods:{
        submitHandler(){
            let url = "http://localhost:6677/product/saveOrUpdate";
            request({
                url,
                method:"post",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                data:querystring.stringify(this.form)
            }).then((response)=>{
                this.closeModalHandler();
                this.loadData();
                this.$message({
                    type:"success",message:response.message
                })
            })
        },
        //重载产品数据
        loadData(){
            let url = "http://localhost:6677/product/findAll";
            request.get(url).then((response)=>{
                this.products = response.data;
            })
        },
        toUpdateHandler(){
            this.title = "修改产品信息";
            this.visible = true;
        },
        toDetailsHandler(){
            this.title = "产品详情";
            this.visible = true;
        },
        toDeleteHandler(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        },
        closeModalHandler(){
            this.visible = false;
        },
        toAddHandler(row){
            this.title = "录入产品信息";
            this.visible = true;
        },
        closeModalHandler(){
            this.visible = false;
        }
    }
    
}
</script>
<style scoped>

</style>