package com.ecommerce.shopease.services;

import com.ecommerce.shopease.models.Product;
import com.ecommerce.shopease.models.ProductScore;
import com.ecommerce.shopease.repos.ProductRepository;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class LuceneService {

    private final Directory index;
    private final IndexWriterConfig config;
    private IndexWriter writer;

    private final ProductRepository productRepository;

    public LuceneService(ProductRepository productRepository) {
        try {
            Path indexPath = Paths.get("specification_documents");
            if (!Files.exists(indexPath)) {
                Files.createDirectories(indexPath);
            }
            index = FSDirectory.open(indexPath);
            config = new IndexWriterConfig(new StandardAnalyzer());
            this.productRepository = productRepository;
        } catch (IOException e) {
            throw new RuntimeException("Error initializing Lucene index", e);
        }
    }

    public void indexExistingProducts() {
        List<Product> products = productRepository.findAll();
        for (Product product : products) {
            indexProduct(product.getId(), product.getSpecifications());
        }
    }

    public void indexProduct(Long productId, String specifications) {
        if (writer == null) {
            try {
                writer = new IndexWriter(index, config);
            } catch (IOException e) {
                throw new RuntimeException("Error creating Lucene IndexWriter", e);
            }
        }
        Document doc = new Document();
        doc.add(new StringField("productId", productId.toString(), Field.Store.YES));
        doc.add(new TextField("specifications", specifications, Field.Store.YES));
        try {
            writer.addDocument(doc);
        } catch (IOException e) {
            throw new RuntimeException("Error adding document to Lucene index", e);
        }
    }

    public Set<ProductScore> search(String field, String queryStr) {
        try {
            IndexSearcher searcher = new IndexSearcher(DirectoryReader.open(index));
            QueryParser parser = new QueryParser(field, new StandardAnalyzer());
            Query query = parser.parse(queryStr);
            TopDocs topDocs = searcher.search(query, 10);

            Set<ProductScore> results = new HashSet<>();
            for (ScoreDoc scoreDoc : topDocs.scoreDocs) {
                Document doc = searcher.doc(scoreDoc.doc);
                long productId = Long.parseLong(doc.get("productId"));
                double score = scoreDoc.score; // Retrieve the score from ScoreDoc
                results.add(new ProductScore(productId, score));
            }

            return results;
        } catch (IOException | ParseException e) {
            throw new RuntimeException("Error searching in Lucene index", e);
        }
    }

    public void closeIndexWriter() {
        if (writer != null) {
            try {
                writer.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void closeIndex() {
        try {
            index.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
